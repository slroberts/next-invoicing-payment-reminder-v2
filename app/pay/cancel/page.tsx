'use client';
import Invoice from '@/components/Invoice';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import UserInfo from '@/components/UserInfo';
import useInvoiceParams from '@/hooks/useInvoiceParams';
import useInvoiceData from '@/hooks/useInvoiceData';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CancelPage() {
  const { userId, clientId, invoiceId, total } = useInvoiceParams();
  const { user, invoice, client, isLoading, isEmailSent, errorMessage } =
    useInvoiceData(userId, invoiceId, clientId);

  const router = useRouter();

  if (!invoice || !client) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {user && <UserInfo user={user} />}

      <hr className='my-6' />
      {invoice && client && <Invoice invoice={invoice} client={client} />}
      {client && invoice && invoice.paymentStatus == 'NOT_PAID' && (
        <Button
          className='mt-8 text-sm md:text-base float-right'
          onClick={() => {
            router.push(
              `/pay?stripeAccountId=${user?.stripeAccountId}&userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}&total=${total}`
            );
          }}
        >
          Pay Invoice
        </Button>
      )}
    </div>
  );
}
