import { db } from '@/lib/db';

export default async function handler(
  req: {
    query: { id: any };
    method: string;
    body: any;
    cookies: { [x: string]: string | Uint8Array };
  },
  res: any
) {
  if (req.method === 'POST') {
    const { name, price, hours, invoiceId } = req.body;

    try {
      const item = await db.item.create({
        data: {
          name,
          price,
          hours,
          invoiceId,
        },
      });

      res.status(200).json({ message: 'Item created successfully', item });
    } catch (error) {
      res.status(500).json({ message: 'Error creating item', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
