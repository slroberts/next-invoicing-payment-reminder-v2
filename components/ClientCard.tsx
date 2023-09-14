import { FC } from 'react';
import { Prisma } from '@prisma/client';
import InvoicesCountAndSentStatus from './InvoicesCountAndSentStatus';
import { formatPhoneNumber } from '@/lib/utils';

const clients = Prisma.validator<Prisma.ClientDefaultArgs>()({
  include: {
    invoices: true,
  },
});

type Clients = Prisma.ClientGetPayload<typeof clients>;

const ClientCard: FC<{ client: Clients }> = ({ client }) => {
  const { name, address, email, phoneNumber } = client;

  return (
    <div className='text-sm leading-4'>
      <p className='font-bold text-base'>
        {name.length > 15 ? `${name.slice(0, 15)}...` : name}
      </p>

      <div className='hidden md:block'>
        <p>{address}</p>
        <p>{email}</p>
        <p className='mt-2'>{formatPhoneNumber(phoneNumber)}</p>
      </div>

      <InvoicesCountAndSentStatus client={client} />
    </div>
  );
};

export default ClientCard;
