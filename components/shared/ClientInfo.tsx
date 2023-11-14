import { AtSign, Briefcase, MapPin, PhoneCall } from 'react-feather';
import { IClient } from '@/lib/interfaces/interfaces';
import { formatPhoneNumber } from '@/lib/utils';

const ClientInfo = ({ client }: { client: IClient }) => {
  const { name, address, email, phoneNumber } = client;

  return (
    <div className='flex flex-wrap gap-8 lg:gap-12 py-2 lg:divide lg:divide-x lg:divide-slate-700'>
      <div>
        <h1 className='flex gap-4 items-center text-2xl md:text-3xl'>
          <Briefcase className='text-slate-600 w-[1.75rem] h-[1.75rem]' />
          <span className='text-slate-200 font-bold'>{name}</span>
        </h1>
      </div>

      <div className='flex flex-col gap-1 lg:pl-12 text-slate-300 text-xl'>
        <div className='flex gap-4 items-center'>
          <MapPin className=' text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {address}
        </div>
        <div className='flex gap-4 items-center'>
          <AtSign className=' text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {email}
        </div>
        <div className='flex gap-4 items-center'>
          <PhoneCall className=' text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {formatPhoneNumber(phoneNumber as string)}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
