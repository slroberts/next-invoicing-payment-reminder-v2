import { FC } from 'react';
import { IInvoice } from '@/lib/interfaces/interfaces';

interface TotalRevenueProps {
  invoices: IInvoice[];
}

const TotalRevenue: FC<TotalRevenueProps> = ({ invoices }) => {
  const totalRevenue = invoices
    .filter((invoice) => invoice.paymentStatus === 'PAID')
    .reduce((acc, curr) => {
      return acc + curr.total;
    }, 0);

  return (
    <div className='bg-slate-900 rounded-lg p-6'>
      <h3 className='text-white font-semibold'>Cumulative Earnings to Date</h3>
      <p className='text-blue-600 text-3xl font-medium'>
        ${totalRevenue.toFixed(2)}
      </p>
      <p className='text-slate-500 text-xs'>Sum of Total Payments Received </p>
    </div>
  );
};

export default TotalRevenue;
