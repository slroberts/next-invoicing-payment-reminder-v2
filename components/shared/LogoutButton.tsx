'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'react-feather';

const LogoutButton = () => {
  const router = useRouter();
  const { setIsUserLoggedIn } = useAuth();

  async function logout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.replace(`/login`);
      router.refresh();
      localStorage.removeItem('user');
      setIsUserLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div
      id='logout-button'
      className='flex cursor-pointer text-sm transition-opacity hover:opacity-70'
      onClick={logout}
    >
      <LogOut className='w-[1.5rem] h-[1.5rem] text-slate-500' />
    </div>
  );
};

export default LogoutButton;
