import { FC } from 'react';
import clsx from 'clsx';

interface InputProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

const Input: FC<InputProps> = ({
  name,
  required,
  placeholder,
  className,
  value,
  onChange,
  type,
  ...props
}) => {
  return (
    <input
      name={name}
      required={required}
      placeholder={placeholder}
      className={clsx(
        'border-solid border-[1px] px-4 text-base rounded-full w-full',
        className
      )}
      value={value}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

export default Input;
