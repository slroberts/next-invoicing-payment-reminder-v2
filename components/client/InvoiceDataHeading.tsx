import { ReactNode } from 'react';

const InvoiceDataHeading = ({ children }: { children: ReactNode }) => {
  return (
    <span className='block md:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
      {children}
    </span>
  );
};

export default InvoiceDataHeading;
