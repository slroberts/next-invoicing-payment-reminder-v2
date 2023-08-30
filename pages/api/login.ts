import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { comparePasswords, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user || !(await comparePasswords(req.body.password, user.password))) {
      
      return res.status(401).json({ error: 'Invalid login' });
    }

    const jwt = await createJWT(user);
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    return res.status(201).end();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
