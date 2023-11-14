import { IUser } from '@/lib/interfaces/interfaces';
import { AtSign, User } from 'react-feather';

const UserInfo = ({ user }: { user: IUser }) => {
  const { firstName, lastName, email } = user;
  return (
    <div>
      <div className='font-semibold -mb-2 text-blue-600'>From</div>
      <div className='flex flex-col md:flex-row md:gap-12 md:text-lg lg:divide lg:divide-x divide-slate-700 mt-4'>
        <p className='flex gap-2 items-center text-slate-200'>
          <User className='hidden md:block text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {firstName} {lastName}
        </p>
        <p className='lg:pl-12 flex gap-2 items-center text-slate-200'>
          <AtSign className='hidden md:block text-slate-600 w-[1.25rem] h-[1.25rem]' />
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
