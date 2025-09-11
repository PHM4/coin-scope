import React from 'react';
import { DollarSign, BarChart3, Activity, TrendingUp, Clock } from 'lucide-react';
import type { CoinData } from '../types'; 
import Chart from './Chart';

interface CoinDetailsProps {
  coin: CoinData | null;
  rank: number;
  chartData: { time: string; price: number }[];
  chartLoading: boolean;
  formatNumber: (num: number) => string;
  formatYAxis: (num: number) => string;
}

const CoinDetails: React.FC<CoinDetailsProps> = ({
  coin,
  rank,
  chartData,
  chartLoading,
  formatNumber,
  formatYAxis,
}) => {
  if (!coin) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg">Select a cryptocurrency to view details</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <img src={coin.image} alt={coin.name} className="w-12 h-12 mr-4 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h2>
          <p className="text-gray-600">Rank #{rank}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Four info boxes */}
        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-700">Current Price</h3>
          </div>
          <p className="text-3xl font-bold text-indigo-800">£{coin.current_price.toLocaleString()}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="flex items-center mb-2">
            <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-700">Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-800">{formatNumber(coin.market_cap)}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-700">24h Volume</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-800">{formatNumber(coin.total_volume)}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-700">24h Change</h3>
          </div>
          <p className={`text-2xl font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {coin.price_change_percentage_24h >= 0 ? '+' : ''}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">24-Hour Price Trend</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            Live data
          </div>
        </div>

        <div className="h-96">
          {chartLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : chartData.length > 0 ? (
            <Chart data={chartData} positive={coin.price_change_percentage_24h >= 0} formatYAxis={formatYAxis} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No chart data available. Try refreshing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
