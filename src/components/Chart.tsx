import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface ChartProps {
  data: { time: string; price: number }[];
  positive?: boolean;
  formatYAxis: (value: number) => string;
}

const Chart: React.FC<ChartProps> = ({ data, positive, formatYAxis }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
          interval="preserveStartEnd"
        />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={formatYAxis} width={60} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="price"
          stroke={positive ? '#10b981' : '#ef4444'}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: positive ? '#10b981' : '#ef4444' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
