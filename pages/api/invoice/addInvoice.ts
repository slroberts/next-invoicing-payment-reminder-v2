import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function handler(
  req: {
    method: string;
    body: any;
    cookies: { [x: string]: string | Uint8Array };
  },
  res: {
    status: any;
    json: (arg0: { data: { message: string; id: string } }) => void;
  }
) {
  if (req.method === 'POST') {
    const { due, clientId } = req.body;

    try {
      const user = await validateJWT(
        req.cookies[process.env.COOKIE_NAME as string]
      );

      const newInvoice = await db.invoice.create({
        data: {
          due,
          ownerId: user.id,
          clientId: clientId,
        },
      });

      res.status(201).json({ data: { id: newInvoice.id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating invoice' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
