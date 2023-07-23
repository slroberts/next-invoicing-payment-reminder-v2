'use client';
import Link from 'next/link';
import { LogIn } from 'react-feather';
import LogoutButton from './LogoutButton';
import UserGreeting from './UserGreeting';
import { UserProps } from '@/lib/interfaces/interfaces';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const HeaderLoginLogoutBtn = ({ user }: { user: UserProps }) => {
  const { isUserLoggedIn } = useAuth();
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  if (!isUserLoggedIn) {
    return (
      <Link href='/login' className='underline text-blue-300'>
        <LogIn />
      </Link>
    );
  }

  return (
    <div>
      <div className='flex w-max justify-between items-center gap-4 font-medium text-slate-400'>
        <UserGreeting user={user} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default HeaderLoginLogoutBtn;
