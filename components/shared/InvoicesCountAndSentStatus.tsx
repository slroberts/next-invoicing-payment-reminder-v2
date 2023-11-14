import { IClient } from '@/lib/interfaces/interfaces';
import { Award, FileText } from 'react-feather';

const InvoicesCountAndSentStatus = ({ client }: { client: IClient }) => {
  const invoices = client.invoices;

  const totalInvoices = invoices?.length ?? 0;
  const paidInvoices =
    invoices?.filter(
      (i: { paymentStatus: string }) => i.paymentStatus === 'PAID'
    ).length ?? 0;

  return (
    <div className='flex justify-between mt-2 font-medium text-slate-500'>
      <div className='inline-flex items-center gap-1'>
        <FileText className='w-4' />
        {totalInvoices} {totalInvoices < 2 ? 'Invoice' : 'Invoices'}
      </div>

      <div className='inline-flex items-center gap-1'>
        <Award className='w-4' />
        {paidInvoices} Paid
      </div>
    </div>
  );
};

export default InvoicesCountAndSentStatus;
