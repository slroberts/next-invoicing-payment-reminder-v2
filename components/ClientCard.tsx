import { FC } from 'react';
import { Prisma } from '@prisma/client';
import InvoicesCountAndSentStatus from './InvoicesCountAndSentStatus';

const clients = Prisma.validator<Prisma.ClientArgs>()({
  include: {
    invoices: true,
  },
});

type Clients = Prisma.ClientGetPayload<typeof clients>;

const ClientCard: FC<{ client: Clients }> = ({ client }) => {
  const { name, address, email, phoneNumber } = client;

  return (
    <div className='text-sm leading-4'>
      <p className='flex gap-2 items-center font-bold text-base'>{name}</p>

      <div className='hidden md:block'>
        <p>{address}</p>
        <p>{email}</p>
        <p>{phoneNumber}</p>
      </div>

      <InvoicesCountAndSentStatus client={client} />
    </div>
  );
};

export default ClientCard;
