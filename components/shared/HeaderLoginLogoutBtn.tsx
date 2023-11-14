'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IUser } from '@/lib/interfaces/interfaces';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/shared/LogoutButton';
import UserGreeting from '@/components/shared/UserGreeting';
import { LogIn } from 'react-feather';

const HeaderLoginLogoutBtn = ({ user }: { user: IUser }) => {
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
        <Link href='/login' className='underline text-slate-500'>
          <LogIn />
        </Link>
      )}
    </div>
  );
};

export default HeaderLoginLogoutBtn;
