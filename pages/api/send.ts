import { db } from '@/lib/db';
import { sendEmailAndHandleDB } from '@/lib/sharedEmailUtils';

export default async function handler(
  req: { body: { data: any; content: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  }
) {
  try {
    const { data, content } = req.body;

    if (!data.client || !content.invoice) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const invoiceDueDate = new Date(content.invoice.due);
    const reminderDate = new Date(invoiceDueDate);
    reminderDate.setDate(invoiceDueDate.getDate() - 10);

    let shouldSendEmail = false;

    if (
      (today.getTime() === reminderDate.getTime() ||
        today.getTime() === invoiceDueDate.getTime()) &&
      content.invoice.paymentStatus === 'NOT_PAID'
    ) {
      shouldSendEmail = true;
    } else if (content.invoice.status === 'NOT_SENT') {
      shouldSendEmail = true;
    }

    if (shouldSendEmail) {
      const response = await sendEmailAndHandleDB(
        data,
        content,
        './emails/InvoiceEmail.ejs',
        `New Invoice - ${content.invoice.id}`,
        'SENT',
        async (invoiceId, status) => {
          await db.invoice.update({
            where: { id: invoiceId },
            data: { status: status },
          });
        }
      );

      return res.status(response.status).json({ message: response.message });
    }

    return res.status(200).json({ message: 'No action needed' });
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
