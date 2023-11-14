import { FC } from 'react';
import { IClient, IInvoice } from '@/lib/interfaces/interfaces';
import { truncateName } from '@/lib/utils';

interface RecentlyPaidListProps {
  clients: IClient[];
}

const RecentlyPaidList: FC<RecentlyPaidListProps> = ({ clients }) => {
  const allPaidInvoices: { invoice: IInvoice; clientName: string }[] = [];

  clients.forEach((client) => {
    if (client.invoices) {
      const paidInvoices = client.invoices.filter(
        (invoice) => invoice.paymentStatus === 'PAID'
      );

      paidInvoices.forEach((invoice) => {
        allPaidInvoices.push({
          invoice,
          clientName: client.name,
        });
      });
    }
  });

  allPaidInvoices.sort((a, b) => {
    const dateA = new Date(a.invoice.updatedAt);
    const dateB = new Date(b.invoice.updatedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const lastFivePaidInvoices = allPaidInvoices.slice(0, 6);

  return (
    <div className='bg-slate-900 rounded-lg p-6'>
      <h3 className='text-white font-semibold'>Current Paid-Up Invoices</h3>
      <p className='text-slate-500 text-sm'>Recently paid invoices</p>

      {lastFivePaidInvoices.map(({ invoice, clientName }) => {
        const displayId = invoice.id
          ? `# ${invoice.id.slice(0, 8)}`
          : 'Unknown';
        const totalAmount = invoice.total ? `$ ${invoice.total}` : 'N/A';

        return (
          <div
            key={invoice.id}
            className='flex justify-between items-center py-2'
          >
            <div>
              <p className='text-white text-sm font-medium mt-2'>{displayId}</p>
              <p className='text-slate-500 text-sm text'>
                {truncateName(clientName)}
              </p>
            </div>
            <p className='text-white text-base font-medium'>{totalAmount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RecentlyPaidList;
