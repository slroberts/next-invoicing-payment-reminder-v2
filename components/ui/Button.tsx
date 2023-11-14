import { FC } from 'react';
import { cva } from 'class-variance-authority';

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  intent?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const buttonClasses = cva(
  [
    'rounded-full',
    'font-medium',
    'active:scale-100',
    'transition',
    'duration-200',
    'ease-in-out',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-gradient-to-r from-cyan-400',
          'to-blue-600',
          'text-white',
          'border-transparent',
          'hover:-hue-rotate-60',
        ],

        secondary: [
          'bg-white',
          'text-blue-600',
          'border-blue-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-[1px]',
          'border-gray-800',
        ],
        text: ['bg-transparent', 'text-black', 'hover:text-blue-600'],
      },
      size: {
        small: ['text-md', 'px-4', 'py-1'],
        medium: ['text-lg', 'px-8', 'py-2'],
        large: ['text-xl', 'px-12', 'py-3'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

const Button: FC<ButtonProps> = ({
  disabled,
  children,
  className,
  intent,
  size,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses({ intent, size, className })}
    >
      {children}
    </button>
  );
};

export default Button;
