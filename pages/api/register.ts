import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { createJWT, hashPassword } from '@/lib/auth';
import { serialize } from 'cookie';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  try {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    const jwt = await createJWT(user);
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
