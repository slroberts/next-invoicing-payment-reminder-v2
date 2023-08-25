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

  if (pathname === '/login' || pathname?.includes('/pay')) {
    return null;
  }

  return (
    <div>
      {isUserLoggedIn ? (
        <div className='flex w-max justify-between items-center gap-4 font-medium text-slate-400'>
          <UserGreeting user={user} />
          <LogoutButton />
        </div>
      ) : (
        <Link href='/login' className='underline text-blue-300'>
          <LogIn />
        </Link>
      )}
    </div>
  );
};

export default HeaderLoginLogoutBtn;
