'use client';
import { useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useInvoiceParams from '@/hooks/useInvoiceParams';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PayPage() {
  const { stripeAccountId, userId, clientId, invoiceId, total } =
    useInvoiceParams();

  const processPayment = useCallback(async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeAccountId,
          userId,
          invoiceId,
          clientId,
          total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to create checkout session'
        );
      }

      const { sessionId } = await response.json();

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );

      if (stripe === null) {
        throw new Error('Failed to initialize Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment process error:', error);
    }
  }, [stripeAccountId, userId, invoiceId, clientId, total]);

  useEffect(() => {
    const checkPaymentStatusAndProcess = async () => {
      const responseInvoice = await fetch(
        `/api/webInvoice?userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}&total=${total}`
      );

      if (!responseInvoice.ok) {
        throw new Error('Failed to fetch the invoice.');
      }

      const data = await responseInvoice.json();
      const paymentStatus = data.invoice.paymentStatus;

      if (paymentStatus === 'PAID') {
        window.location.href = `/pay/success?userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}`;
      } else {
        processPayment();
      }
    };

    if (userId && invoiceId && clientId) {
      checkPaymentStatusAndProcess();
    }
  }, [userId, invoiceId, clientId, processPayment, total]);

  return <LoadingSpinner />;
}
