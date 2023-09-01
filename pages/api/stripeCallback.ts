import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Callback URL:', req.url);
  console.log('Query Parameters:', req.query);

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const authCode = req.query.code as string;
  const userId = req.query.state as string;

  if (!userId) {
    return res.status(400).send('User ID not provided.');
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: authCode,
    });

    const connectedAccountId = response.stripe_user_id;

    await db.user.update({
      where: { id: userId },
      data: { stripeAccountId: connectedAccountId },
    });

    res.writeHead(302, { Location: '/dashboard' });
    return res.end();
  } catch (error) {
    console.error('Stripe OAuth error:', error);
    return res.status(500).json({ error: 'Stripe OAuth process failed.' });
  }
};
