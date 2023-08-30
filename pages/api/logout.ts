import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME as string, '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Make sure to use 'secure' only if in production
          path: '/',
          expires: new Date(0),
        })
      );
      return res.status(200).json({ message: 'Logged out successfully' });

    default:
      return res.status(405).end('Method Not Allowed');
  }
}
