'use client';

import { StocksService } from '@/services';
import { SearchInput, StockEntryRow } from '@/shared/components';
import { useEffect, useState } from 'react';
import StocksList from './StocksList';
import { useStore } from '@/store/store';

interface StockItem {
  ticker: string;
  name: string;
  price?: number;
}

const Stocks = () => {
  const [results, setResults] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { watchStock, watchedStocks } = useStore();

  const handleSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const data = await StocksService.searchStocks(query);
      if (data) {
        const initialResults = data.map((result) => ({ ticker: result.ticker, name: result.name }));
        setResults(initialResults);
        // Fetch initial live prices
        fetchLivePrices(initialResults.map((result) => result.ticker));
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch search results.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLivePrices = async (tickers: string[]) => {
    const prices = await Promise.all(
      tickers.map(async (ticker) => {
        const price = await StocksService.getStockLatestPrice(ticker);
        return { ticker, price: price?.price };
      })
    );

    setResults((prevResults) =>
      prevResults.map((result) => {
        const priceData = prices.find((p) => p.ticker === result.ticker);
        return { ...result, price: priceData?.price };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (results.length > 0) {
        fetchLivePrices(results.map((result) => result.ticker));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [results]);

  const onAddToWatchList = (stock: StockItem) => {
    watchStock(stock);
  }

  return (
    <div className="flex flex-col">
      <SearchInput label="Search Stocks" onSearch={handleSearch} placeholder='Enter stock/ticker name here' />

      {loading && <p>Fetching Stocks...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <StocksList stockItems={results} onWatchStock={onAddToWatchList} />
    </div>
  );
};

export default Stocks;