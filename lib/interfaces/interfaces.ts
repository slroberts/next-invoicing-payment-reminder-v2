import { Client, Invoice, Item, User } from '@prisma/client';
import { MouseEvent } from 'react';

export interface BackButtonProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  label: string;
}

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

export interface ClientProps {
  client?: Client;
  id?: string;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  label?: string;
  modalRef?: React.RefObject<HTMLDivElement>;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: string;
  deleted?: boolean;
}

export interface DeleteButtonProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  item?: { id?: string };
  invoice?: { id: string };
}

export interface FormProps {
  label: string;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
  }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  error: string;
  onClose: () => void;
  isOpen: boolean;
  modalRef?: any;
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

export interface InvoiceProps {
  invoices?: Invoice[];
  due?: any;
  clientId?: string;
}

export interface ItemProps {
  id?: string;
  name?: string;
  price?: number;
  hours?: number;
  invoiceId?: string;
  label?: string;
  invoice?: (Invoice & { items: Item[] }) | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalRef?: any;
}

export interface Params {
  id?: string;
}

export interface SendButtonProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  user: User;
  client: Client;
  invoice: Invoice;
  items: Item[];
  subTotal: number;
  salesTax: number;
  total: string;
}

export interface UserProps {
  user?: User;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  password?: string;
  firstName?: string | null;
  lastName?: string | null;
}
