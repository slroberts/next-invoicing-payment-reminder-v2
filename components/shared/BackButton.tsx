'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'react-feather';

interface BackButtonProps {
  label: string;
  url: string;
}

const BackButton: FC<BackButtonProps> = ({ label, url }) => {
  const router = useRouter();

  function handleBackClick() {
    router.replace(url);
  }

  return (
    <div
      className='w-[9.25rem] flex cursor-pointer transition-opacity hover:opacity-70'
      onClick={handleBackClick}
    >
      <ArrowLeft className='text-blue-600 w-[1.25rem] h-[1.25rem]' />
      <span className='text-slate-200 text-sm'>{label}</span>
    </div>
  );
};

export default BackButton;
