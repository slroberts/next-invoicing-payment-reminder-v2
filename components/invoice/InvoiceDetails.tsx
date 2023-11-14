import { IInvoice } from '@/lib/interfaces/interfaces';
import { AlertCircle, Calendar, FileText } from 'react-feather';

const InvoiceDetails = ({ invoice }: { invoice: IInvoice }) => {
  const invoiceDetails = [
    { Icon: FileText, label: 'Invoice Id', value: invoice.id.slice(0, 8) },
    { Icon: Calendar, label: 'Date Due', value: invoice.due },
    {
      Icon: AlertCircle,
      label: 'Payment Status',
      value: invoice.paymentStatus === 'PAID' ? 'Paid' : 'Not Paid',
    },
  ];

  if (!invoice) {
    return null;
  }

  return (
    <div className='flex flex-col md:flex-row flex-wrap lg:gap-16 text-slate-300 text-base lg:divide-x divide-slate-700 -ml-16'>
      {invoiceDetails.map(({ Icon, label, value }) => (
        <div key={label} className='flex flex-row gap-2 items-center  pl-16'>
          <Icon className='text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {label}:<span className='font-bold'>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default InvoiceDetails;
