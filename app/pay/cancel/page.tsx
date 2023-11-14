'use client';
import { useRouter } from 'next/navigation';
import useInvoiceParams from '@/hooks/useInvoiceParams';
import useInvoiceData from '@/hooks/useInvoiceData';
import Invoice from '@/components/invoice/Invoice';
import UserInfo from '@/components/shared/UserInfo';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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
      <hr className='my-8 border-[.0125rem] border-slate-700' />
      <Invoice invoice={invoice} client={client} />
      {invoice.paymentStatus == 'NOT_PAID' && (
        <Button
          className='mt-8 text-sm md:text-base float-right'
          onClick={() => {
            router.push(
              `/pay?stripeAccountId=${user?.stripeAccountId}&userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}&total=${total}`
            );
          }}
        >
          Pay Invoice - <span className='text-base'>${total}</span>
        </Button>
      )}
    </div>
  );
}
