import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import { User } from 'react-feather';
import LogoutButton from './LogoutButton';

const getData = async () => {
  const user = await getUserFromCookie(cookies() as any);

  return user;
};
const UserGreeting = async () => {
  const user = await getData();

  return (
    <div className='-mt-12 float-right'>
      <div className='flex w-max justify-between items-center gap-4 font-medium text-slate-400'>
        <div className='flex items-center gap-2'>
          <User className='w-[1.5rem] h-[1.5rem] rounded-full border-2 border-blue-300 bg-blue-50 text-blue-300' />{' '}
          <span className='hidden sm:block text-base'>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserGreeting;
