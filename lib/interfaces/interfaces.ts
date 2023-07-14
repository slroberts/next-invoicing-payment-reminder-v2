import { User } from '@prisma/client';

export interface ButtonProps {
  disabled?: boolean;
  children?: any;
  className?: string;
  intent?: any;
  size?: any;
  onClick?: () => void;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface InputProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  value: any;
  onChange: any;
  type: string;
  className: string;
}

export interface UserProps {
  user?: User;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
