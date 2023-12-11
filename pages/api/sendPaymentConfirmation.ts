import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { InvoiceEmailProps } from '@/lib/interfaces/interfaces';
import { ConfirmationEmail } from '@/components/templates/confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  'Invoicing Payment Reminder <noreply@invoicingpaymentreminder.com>';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { emailData, emailContent } = req.body;
    const { user, client } = emailData;
    const { invoice, items } = emailContent;

    // Check for invalid data
    if (!client || !invoice) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

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

    // Email configuration
    const emailConfig = {
      from: FROM_EMAIL,
      to: client.email,
      subject: `Payment Confirmation - ${invoice.id} via Invoicing Payment Reminder`,
      react: ConfirmationEmail(invoiceEmailProps),
      text: `Payment Confirmation - ${invoice.id} via Invoicing Payment Reminder`,
    };

    // Send email
    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Error sending email:', error);
      return res.status(400).json({ error: error.message });
    }

    // Update invoice status in the database
    await db.invoice.update({
      where: { id: invoice.id },
      data: { paymentStatus: 'PAID' },
    });

    console.log('Email sent successfully:', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
