'use client';
import Invoice from '@/components/Invoice';
import UserInfo from '@/components/UserInfo';
import useInvoiceParams from '@/hooks/useInvoiceParams';
import useInvoiceData from '@/hooks/useInvoiceData';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SuccessPage() {
  const { userId, clientId, invoiceId } = useInvoiceParams();
  const { user, invoice, client, isLoading, isEmailSent, errorMessage } =
    useInvoiceData(userId, invoiceId, clientId);

  if (!invoice || !client) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className='font-bold mb-2'>Payment Successful</h1>
      <p>Thank you for your payment, your transaction has been completed.</p>

      <hr className='my-6' />

      {user && <UserInfo user={user} />}

      <hr className='my-6' />

      {invoice && client && <Invoice invoice={invoice} client={client} />}
    </div>
  );
}
