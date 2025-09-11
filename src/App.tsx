import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import CoinList from './components/CoinList';
import CoinDetails from './components/CoinDetails';
import type { CoinData } from './types';

function App() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchCoinData();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      fetchChartData(selectedCoin.id);
    }
  }, [selectedCoin]);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h'
      );
      const data = await response.json();
      setCoins(data);
      if (data.length > 0) {
        setSelectedCoin(data[0]);
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (coinId: string) => {
    try {
      setChartLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=gbp&days=1`
      );
      const data = await response.json();
      if (!data.prices || data.prices.length === 0) {
        throw new Error('No price data available');
      }
      const formatted = data.prices.map(([timestamp, price]: [number, number]) => {
        const date = new Date(timestamp);
        const timeLabel = date.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return { time: timeLabel, price };
      });
      setChartData(formatted);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  };

  // ✅ these must return string, not void
  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `£${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `£${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `£${(num / 1e3).toFixed(2)}K`;
    return `£${num.toFixed(2)}`;
  };

  const formatYAxis = (value: number): string => {
    if (value >= 1000) return `£${(value / 1000).toFixed(1)}k`;
    return `£${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">CoinScope</h1>
          <p className="text-lg text-indigo-600">Track cryptocurrency prices in GBP</p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={fetchCoinData}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
            {lastUpdated && (
              <p className="text-sm text-gray-600">
                Last updated: {lastUpdated.toLocaleTimeString('en-GB')}
              </p>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CoinList
            coins={coins.filter(
              (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            )}
            loading={loading}
            selectedCoin={selectedCoin}
            search={search}
            onSearch={setSearch}
            onSelect={setSelectedCoin}
          />

          <CoinDetails
            coin={selectedCoin}
            rank={selectedCoin ? coins.findIndex((c) => c.id === selectedCoin.id) + 1 : 0}
            chartData={chartData}
            chartLoading={chartLoading}
            formatNumber={formatNumber}
            formatYAxis={formatYAxis}
          />
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Data provided by{' '}
            <a href="https://www.coingecko.com" className="text-indigo-600 hover:underline">
              CoinGecko API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
