import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: 'User ID not provided.' });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        stripeAccountId: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getUser;
