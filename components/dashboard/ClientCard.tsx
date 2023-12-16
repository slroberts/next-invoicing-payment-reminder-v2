import { IClient } from '@/lib/interfaces/interfaces';
import { truncateName } from '@/lib/utils';
import InvoicesCountAndSentStatus from '@/components/shared/InvoicesCountAndSentStatus';

const ClientCard = ({ client }: { client: IClient }) => {
  const { name, email } = client;

  return (
    <div className='client-card text-sm leading-4'>
      <p className='font-semibold text-sm text-slate-100 mb-1'>
        {truncateName(name)}
      </p>

      <p className='text-slate-500'>{email}</p>

      <InvoicesCountAndSentStatus client={client} />
    </div>
  );
};

export default ClientCard;
