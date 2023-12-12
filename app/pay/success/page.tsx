'use client';
import useInvoiceParams from '@/hooks/useInvoiceParams';
import useInvoiceData from '@/hooks/useInvoiceData';
import Invoice from '@/components/invoice/Invoice';
import UserInfo from '@/components/shared/UserInfo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function SuccessPage() {
  const { userId, clientId, invoiceId } = useInvoiceParams();
  const { user, invoice, client, isLoading, isEmailSent, errorMessage } =
    useInvoiceData(userId, invoiceId, clientId);

  if (!invoice || !client) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className='my-2 font-bold text-2xl text-slate-200'>
        Thank You for Your Payment! 🌟
      </h1>
      <p className='text-slate-200'>
        Your payment has been received successfully. Look out for a confirmation
        email heading your way shortly.
      </p>

      <hr className='my-8 border-[.0125rem] border-slate-700' />

      {user && <UserInfo user={user} />}

      <hr className='my-8 border-[.0125rem] border-slate-700' />

      <Invoice invoice={invoice} client={client} />
    </div>
  );
}
