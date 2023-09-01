import { useSearchParams } from 'next/navigation';

function useInvoiceParams() {
  const searchParams = useSearchParams();

  const stripeAccountId = searchParams?.get('stripeAccountId');
  const userId = searchParams?.get('userId');
  const clientId = searchParams?.get('clientId');
  const invoiceId = searchParams?.get('invoiceId');
  const total = searchParams?.get('total');

  return { stripeAccountId, userId, clientId, invoiceId, total };
}

export default useInvoiceParams;
