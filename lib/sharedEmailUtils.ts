import { readFileSync } from 'fs';
import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import { resolve } from 'path';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const FROM_EMAIL = 'info@invoicingpaymentreminder.com';

export async function sendEmailAndHandleDB(
  data: any,
  content: any,
  emailTemplatePath: string,
  emailSubject: string,
  dbStatus: string,
  dbUpdateFunction: (invoiceId: string, status: any) => Promise<void>
) {
  const template = readFileSync(
    resolve(process.cwd(), emailTemplatePath),
    'utf-8'
  );

  const { user, client } = data;
  const { invoice, items } = content;

  const commonEmailProps = {
    userId: user.id,
    userName: user.firstName,
    userEmail: user.email,
    clientId: client.id,
    clientName: client.name,
    clientAddress: client.address,
    clientEmail: client.email,
    clientPhoneNumber: client.phoneNumber,
    invoiceId: invoice.id,
    invoiceDue: invoice.due,
    items: items,
  };

  const specificEmailProps =
    emailTemplatePath === './emails/InvoiceEmail.ejs'
      ? {
          subTotal: invoice.updatedInvoice.subTotal,
          salesTax: invoice.updatedInvoice.tax,
          total: invoice.updatedInvoice.total,
        }
      : {
          subTotal: invoice.subTotal,
          salesTax: invoice.tax,
          total: invoice.total,
        };

  const renderedEmail = ejs.render(template, {
    ...commonEmailProps,
    ...specificEmailProps,
  });

  const msg = {
    to: data.client.email,
    from: FROM_EMAIL,
    subject: emailSubject,
    html: renderedEmail,
  };

  try {
    await sgMail.send(msg);
    await dbUpdateFunction(content.invoice.id, dbStatus);
    return {
      status: 200,
      message: 'Email sent and status updated successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      message: 'Failed to process',
    };
  }
}
