import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: ReactNode;
}
const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'bg-white w-full md:w-[34rem] mx-auto mt-10 p-8 rounded-md',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
