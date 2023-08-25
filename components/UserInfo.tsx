import { UserProps } from '@/lib/interfaces/interfaces';
import { AtSign, User } from 'react-feather';

const UserInfo = ({ user }: { user: UserProps }) => {
  const { firstName, lastName, email } = user;
  return (
    <div>
      <div className='font-semibold -mb-2 text-blue-600'>From</div>
      <div className='flex flex-col md:flex-row md:gap-8 md:text-lg md:divide md:divide-x mt-4'>
        <p className='flex gap-2 items-center'>
          <User className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
          {firstName} {lastName}
        </p>
        <p className='md:pl-6 flex gap-2 items-center'>
          <AtSign className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
