import { FC } from 'react';
import { CardProps } from '@/lib/interfaces/interfaces';
import clsx from 'clsx';

const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'm-auto mt-10 w-full md:w-4/6 lg:w-3/6 rounded-md px-10 pt-10 pb-4 drop-shadow-xl bg-white border-solid border-[1px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
