import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, clientId, invoiceId, total } = req.body;

    if (!userId || !clientId || !invoiceId || !total) {
      return res
        .status(400)
        .json({ message: 'Required input parameters are missing' });
    }

    const totalInCents = Math.round(Number(total) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Invoice ${invoiceId}`,
            },
            unit_amount: totalInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/pay/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}`,
      cancel_url: `${req.headers.origin}/pay/cancel?userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}&total=${total}`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
