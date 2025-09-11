import React from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import type { CoinData } from '../types'; 

interface CoinListProps {
  coins: CoinData[];
  loading: boolean;
  selectedCoin: CoinData | null;
  search: string;
  onSearch: (val: string) => void;
  onSelect: (coin: CoinData) => void;
}

const CoinList: React.FC<CoinListProps> = ({ coins, loading, selectedCoin, search, onSearch, onSelect }) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 h-[calc(100vh-150px)] flex flex-col">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or symbol..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <ul className="space-y-3">
            {coins.map((coin) => (
              <li
                key={coin.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCoin?.id === coin.id
                    ? 'bg-indigo-100 border border-indigo-300'
                    : 'hover:bg-gray-50 border border-gray-100'
                }`}
                onClick={() => onSelect(coin)}
              >
                <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{coin.name}</h3>
                  <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£{coin.current_price.toLocaleString()}</p>
                  <p className={`text-xs flex items-center justify-end ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.price_change_percentage_24h >= 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoinList;
