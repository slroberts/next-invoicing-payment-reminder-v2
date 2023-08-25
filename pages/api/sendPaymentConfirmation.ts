import { db } from '@/lib/db';
import { sendEmailAndHandleDB } from '@/lib/sharedEmailUtils';

export default async function handler(req: any, res: any) {
  try {
    const { data, content } = req.body;
    if (!data.user || !data.client || !content.invoice) {
      res.status(400).json({ message: 'Invalid data provided' });
      return;
    }

    const response = await sendEmailAndHandleDB(
      data,
      content,
      './emails/PaymentConfirmation.ejs',
      `Payment Confirmation - ${content.invoice.id}`,
      'PAID',
      async (invoiceId, status) => {
        await db.invoice.update({
          where: { id: invoiceId },
          data: { paymentStatus: status },
        });
      }
    );

    return res.status(response.status).json({ message: response.message });
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
