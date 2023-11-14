const InvoiceTotal = ({
  subTotal,
  salesTax,
  total,
}: {
  subTotal: number;
  salesTax: number;
  total: number;
}) => {
  const totals = [
    { label: 'Sub Total', value: subTotal },
    { label: 'Tax (4%)', value: salesTax },
    { label: 'Total', value: total },
  ];

  return (
    <>
      {totals.map(({ label, value }) => (
        <div
          key={label}
          className='grid grid-cols-1 md:grid-cols-12 py-4 font-semibold text-base text-slate-300'
        >
          <div className='px-6 col-span-2'>{label}</div>
          <div className='px-6 col-start-4 md:col-start-10'>${value}</div>
        </div>
      ))}
    </>
  );
};

export default InvoiceTotal;
