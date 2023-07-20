import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function handler(
  req: {
    method: string;
    body: any;
    cookies: { [x: string]: string | Uint8Array };
  },
  res: {
    [x: string]: any;
    json: (arg0: { data: { message: string } }) => void;
  }
) {
  if (req.method === 'POST') {
    const { name, address, email, phoneNumber } = req.body;

    try {
      const user = await validateJWT(
        req.cookies[process.env.COOKIE_NAME as string]
      );

      console.log('User:', user);
      console.log('Cookie:', req.cookies[process.env.COOKIE_NAME as string]);

      const newClient = await db.client.create({
        data: {
          name,
          address,
          email,
          phoneNumber,
          ownerId: user.id,
        },
      });

      console.log('New client:', newClient);

      res.status(201).json({ data: { newClient } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: { message: 'Error creating client' } });
    }
  } else {
    res.status(405).json({ data: { message: 'Method not allowed' } });
  }
}
