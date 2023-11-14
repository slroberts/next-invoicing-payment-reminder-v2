'use client';
import { FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { IClient, IInvoice } from '@/lib/interfaces/interfaces';
import CustomizedAxisTick from '@/components/dashboard/CustomizedAxisTick';

interface FinancialsChartProps {
  clients: IClient[];
  invoices: IInvoice[];
}

interface ChartData {
  name: string;
  revenue: number;
  invoices: number;
}

const FinancialsChart: FC<FinancialsChartProps> = ({ clients, invoices }) => {
  // Initialize client totals
  const clientTotals = new Map();
  clients.forEach((client) => {
    clientTotals.set(client.name, 0);
  });

  // Initialize invoice counts
  const clientInvoiceCounts = new Map();
  clients.forEach((client) => {
    clientInvoiceCounts.set(client.name, 0);
  });

  // Process the invoices
  invoices.forEach((invoice) => {
    if (invoice.paymentStatus === 'PAID') {
      const clientName = clients.find(
        (client) => client.id === invoice.clientId
      )?.name;

      if (clientTotals.has(clientName)) {
        const currentTotal = clientTotals.get(clientName);
        clientTotals.set(clientName, currentTotal + invoice.total);
      }

      if (clientInvoiceCounts.has(clientName)) {
        const currentCount = clientInvoiceCounts.get(clientName);
        clientInvoiceCounts.set(clientName, currentCount + 1);
      }
    }
  });

  const chartData: ChartData[] = [];
  clientTotals.forEach((total, client) => {
    chartData.push({
      name: client,
      revenue: total,
      invoices: clientInvoiceCounts.get(client),
    });
  });

  return (
    <div className='w-full lg:w-6/12 flex-grow flex flex-col justify-between bg-slate-900 float-right rounded-lg pt-6 pl-6 pr-6 pb-0'>
      <h3 className='text-white font-semibold mb-4'>Total Revenue by Client</h3>
      <ResponsiveContainer width='100%' height='auto' aspect={1.15}>
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='rgb(23 37 84)' stopOpacity={0.8} />
              <stop offset='95%' stopColor='rgb(37 99 235)' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='name'
            interval={0}
            height={60}
            tick={<CustomizedAxisTick />}
          />
          Client names
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='revenue'
            stroke='rgb(37 99 235)'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
          <Area
            type='monotone'
            dataKey='invoices'
            stroke='rgb(148 163 184)'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialsChart;
