export interface IUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  stripeAccountId?: string;
  clients?: IClient[];
  invoices?: IInvoice[];
}

export interface IClient {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  invoices?: IInvoice[];
  deleted?: boolean;
}

export enum INVOICE_STATUS {
  SENT = 'SENT',
  NOT_SENT = 'NOT_SENT',
}

export enum PAYMENT_STATUS {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
}

export interface IInvoice {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  clientId: string;
  status: INVOICE_STATUS;
  paymentStatus: PAYMENT_STATUS;
  due: string | null;
  items?: IItem[];
  subTotal: number;
  tax: number;
  total: number;
  deleted: boolean;
}

export interface IItem {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  invoiceId?: string;
  name: string;
  price: number;
  hours: number;
  deleted?: boolean;
}

export interface InvoiceEmailProps {
  userId: string;
  userName: string;
  userEmail: string;
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhoneNumber: string;
  invoiceId: string;
  invoiceDue: string;
  paymentStatus: string;
  items: any[];
  subTotal: number;
  salesTax: number;
  total: number;
  stripeAccountId: string;
}
