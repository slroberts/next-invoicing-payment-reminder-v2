import { FC, ReactElement, cloneElement } from 'react';

interface SortOptionProps {
  direction: 'asc' | 'desc';
  onClick: () => void;
  icon: ReactElement;
}

const SortOption: FC<SortOptionProps> = ({ direction, onClick, icon }) => {
  return (
    <div className='flex cursor-pointer' onClick={onClick}>
      <div className='flex justify-start items-center gap-2 px-4 py-2 text-slate-700 text-sm'>
        {cloneElement(icon, { className: 'w-[1rem] h-[1rem] text-blue-600' })}
        {direction === 'asc' ? 'Asc' : 'Desc'}
      </div>
    </div>
  );
};

export default SortOption;
