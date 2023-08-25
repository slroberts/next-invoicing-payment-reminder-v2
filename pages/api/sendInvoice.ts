import { db } from '@/lib/db';
import { sendEmailAndHandleDB } from '@/lib/sharedEmailUtils';

export default async function handler(req: any, res: any) {
  try {
    const { data, content } = req.body;

    if (!data.client || !content.invoice) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

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
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
