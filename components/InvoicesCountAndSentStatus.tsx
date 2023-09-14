import { FC } from 'react';
import { Prisma } from '@prisma/client';
import { FileText, Send } from 'react-feather';

const clients = Prisma.validator<Prisma.ClientDefaultArgs>()({
  include: {
    invoices: true,
  },
});

type Clients = Prisma.ClientGetPayload<typeof clients>;

const InvoicesCountAndSentStatus: FC<{ client: Clients }> = ({ client }) => {
  const invoices = client.invoices;
  const sentInvoices = invoices.filter(
    (i: { status: string }) => i.status === 'SENT'
  ).length;

  return (
    <div className='flex justify-between mt-4 font-medium text-slate-500'>
      <div className='inline-flex items-center gap-1'>
        <FileText className='w-4' />
        {invoices.length} invoices
      </div>

      <div className='inline-flex items-center gap-1'>
        <Send className='w-4' />
        {sentInvoices} sent
      </div>
    </div>
  );
};

export default InvoicesCountAndSentStatus;
