import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, invoiceId, clientId } = req.query;

    if (!userId || !invoiceId || !clientId) {
      return res
        .status(400)
        .json({ message: 'Required query parameters are missing.' });
    }

    const user = await db.user.findFirst({
      where: { id: userId as string },
    });

    const invoice = await db.invoice.findFirst({
      where: { id: invoiceId as string },
      include: {
        items: true,
      },
    });

    const client = await db.client.findFirst({
      where: { id: clientId as string },
    });

    if (!user || !invoice || !client) {
      return res.status(404).json({ message: 'Data not found.' });
    }

    res.status(200).json({ user, invoice, client });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
