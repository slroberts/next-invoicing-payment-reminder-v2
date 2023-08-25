import { AtSign, Briefcase, MapPin, PhoneCall } from 'react-feather';
import { ClientProps } from '@/lib/interfaces/interfaces';

const ClientInfo = ({ client }: { client: ClientProps }) => {
  const { name, address, email, phoneNumber } = client;
  return (
    <div>
      <h1 className='flex gap-2 items-center font-bold text-lg'>
        <Briefcase className='text-blue-400 w-[1.25rem] h-[1.25rem]' />
        {name}
      </h1>

      <div className='flex flex-col md:flex-row md:gap-8 md:text-lg md:divide md:divide-x mt-4'>
        <p className='flex gap-2 items-center'>
          <MapPin className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
          {address}
        </p>
        <p className='md:pl-6 flex gap-2 items-center'>
          <AtSign className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
          {email}
        </p>
        <p className='md:pl-6 flex gap-2 items-center'>
          <PhoneCall className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
          {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default ClientInfo;
