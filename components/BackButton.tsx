'use client';
import { FC } from 'react';
import { BackButtonProps } from '@/lib/interfaces/interfaces';
import { ArrowLeft } from 'react-feather';
import { useRouter } from 'next/navigation';

const BackButton: FC<BackButtonProps> = ({ label, url }) => {
  const router = useRouter();

  function handleBackClick() {
    router.replace(url);
  }

  return (
    <div
      className='w-[9.25rem] flex cursor-pointer text-sm transition-opacity hover:opacity-70'
      onClick={handleBackClick}
    >
      <ArrowLeft className='text-blue-600 w-[1.25rem] h-[1.25rem]' />
      {label}
    </div>
  );
};

export default BackButton;
