import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME as string, '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
      })
    );
    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
