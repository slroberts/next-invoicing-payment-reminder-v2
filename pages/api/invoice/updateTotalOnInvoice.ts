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
    json: (arg0: {
      data?: { message: string; id?: string };
      message?: string;
    }) => void;
  }
) {
  if (req.method === 'PUT') {
    const { invoiceId, subTotal, salesTax, total } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ message: 'Invoice ID is required.' });
    }

    try {
      const user = await validateJWT(
        req.cookies[process.env.COOKIE_NAME as string]
      );

      if (user) {
        const updatedInvoice = await db.invoice.update({
          where: { id: invoiceId },
          data: {
            subTotal: subTotal,
            tax: salesTax,
            total: total,
          },
        });

        res.status(200).json({
          data: {
            message: 'Invoice updated successfully',
            updatedInvoice,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating invoice' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
