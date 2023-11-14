const InvoiceItemsHeadings = () => {
  const headings = ['Item', 'Price', 'Hours', 'Total'];
  return (
    <div className='grid grid-cols-5 md:grid-cols-12 bg-slate-900'>
      {headings.map((head) => (
        <div
          key={head}
          className='md:col-span-3 px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider'
        >
          {head}
        </div>
      ))}
    </div>
  );
};

export default InvoiceItemsHeadings;
