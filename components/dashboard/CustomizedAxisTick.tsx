import { FC } from 'react';

interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}
const CustomizedAxisTick: FC<CustomizedAxisTickProps> = ({ x, y, payload }) => {
  const maxLength = 8;

  let value = payload?.value || '';
  const truncatedText =
    value.length > maxLength ? value.slice(0, maxLength) + '...' : value;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='middle'
        fill='#FFFFFF'
        fontSize={11}
      >
        {truncatedText}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
