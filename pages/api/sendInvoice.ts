import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import {
  IClient,
  IInvoice,
  InvoiceEmailProps,
} from '@/lib/interfaces/interfaces';
import { InvoiceEmail } from '@/components/templates/invoice-email';
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces';

const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  'Invoicing Payment Reminder <noreply@invoicingpaymentreminder.com>';

// Check if the data is valid
function isValidData(client: IClient, invoice: IInvoice) {
  return !(!client || !invoice);
}

// Check if it's time to send the email
function shouldSendEmail(
  today: Date,
  reminderDate: Date,
  invoiceDueDate: Date,
  paymentStatus: string,
  status: string
) {
  return (
    ((today.getTime() === reminderDate.getTime() ||
      today.getTime() === invoiceDueDate.getTime()) &&
      paymentStatus === 'NOT_PAID') ||
    status === 'NOT_SENT'
  );
}

// Send the email
async function sendEmail(emailConfig: CreateEmailOptions, invoiceId: string) {
  const { data, error } = await resend.emails.send(emailConfig);

  if (error) {
    console.error(`Error sending email for invoice ${invoiceId}:`, error);
    throw new Error('Failed to send email');
  }

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { emailData, emailContent } = req.body;
    const { user, client } = emailData;
    const { invoice, items } = emailContent;

    // Check for invalid data
    if (!isValidData(client, invoice)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const invoiceDueDate = new Date(invoice.due);
    const reminderDate = new Date(invoiceDueDate);
    reminderDate.setDate(invoiceDueDate.getDate() - 3);

    const shouldSend = shouldSendEmail(
      today,
      reminderDate,
      invoiceDueDate,
      invoice.paymentStatus,
      invoice.status
    );

    // If conditions are met, send the email
    if (shouldSend) {
      const invoiceEmailProps: InvoiceEmailProps = {
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
        paymentStatus: invoice.paymentStatus,
        items: items,
        subTotal: invoice.updatedInvoice.subTotal,
        salesTax: invoice.updatedInvoice.tax,
        total: invoice.updatedInvoice.total,
        stripeAccountId: user.stripeAccountId,
      };

      const emailConfig = {
        from: FROM_EMAIL,
        to: client.email,
        subject: `New Invoice - ${invoice.id} via Invoicing Payment Reminder`,
        react: InvoiceEmail(invoiceEmailProps),
        text: `New Invoice from ${user.firstName} ${user.lastName} via Invoicing Payment Reminder`,
      };

      // Send email
      const data = await sendEmail(emailConfig, invoice.id);

      // Update invoice status in the database
      await db.invoice.update({
        where: { id: invoice.id },
        data: { status: 'SENT' },
      });

      console.log('Email sent successfully:', data);
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
