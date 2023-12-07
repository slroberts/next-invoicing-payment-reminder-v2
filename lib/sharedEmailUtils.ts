import { readFileSync } from 'fs';
import { Resend } from 'resend';
import ejs from 'ejs';
import { resolve } from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  'Invoicing Payment Reminder <noreply@invoicingpaymentreminder.com>';

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
    userName: `${user.firstName} ${user.lastName}`,
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
          stripeAccountId: user.stripeAccountId,
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
    await resend.emails.send(msg);
    await dbUpdateFunction(content.invoice.id, dbStatus);
    return {
      status: 200,
      message: 'Email sent and status updated successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 400,
      message: (error as Error).message,
    };
  }
}
