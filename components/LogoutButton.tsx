'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { LogOut } from 'react-feather';

const LogoutButton: FC = () => {
  const router = useRouter();

  async function logout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.replace(`/login`);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div
      className='flex cursor-pointer text-sm transition-opacity hover:opacity-70'
      onClick={logout}
    >
      <LogOut className='w-[1.5rem] h-[1.5rem] text-blue-600' />
    </div>
  );
};

export default LogoutButton;
