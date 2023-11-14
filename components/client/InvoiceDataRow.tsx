import { ReactNode } from 'react';

const InvoiceDataRow = ({ children }: { children: ReactNode }) => {
  return <div className='text-slate-200'>{children}</div>;
};

export default InvoiceDataRow;
