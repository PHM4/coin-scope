// src/components/CustomTooltip.tsx
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
        <p className="text-gray-600">{`Time: ${label}`}</p>
        <p className="text-indigo-600 font-semibold">
          {`Price: £${payload[0].value.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 6 
          })}`}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;