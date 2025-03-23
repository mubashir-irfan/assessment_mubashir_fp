'use client';

import { useState, useEffect } from 'react';
import { StocksService } from '@/services';
import { StockEntryRow } from '@/shared/components';
import { useStore } from '@/store/store';

type StockPrice = Pick<StockItem, 'ticker' | 'price'>;

const Watchlist = () => {
  const watchedStocks = useStore((state) => state.watchedStocks);
  const { unwatchStock } = useStore();
  const [livePrices, setLivePrices] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLivePrices = async (tickers: string[]) => {
      if (tickers.length === 0) {
        setLivePrices([]);
        return;
      }

      setLoading(true);
      const prices = await Promise.all(
        tickers.map(async (ticker) => {
          const price = await StocksService.getStockLatestPrice(ticker);
          return { ticker, price: price?.price };
        })
      );

      setLivePrices(prices);
      setLoading(false);
    };

    const tickers = watchedStocks.map((stock) => stock.ticker);
    fetchLivePrices(tickers);

    const interval = setInterval(() => {
      fetchLivePrices(tickers);
    }, 5000);

    return () => clearInterval(interval);
  }, [watchedStocks]);

  const onUnWatchStock = (ticker: string) => {
    unwatchStock(ticker);
  };

  const sortedWatchedStocks = watchedStocks.map(stock => {
    const livePrice = livePrices.find(price => price.ticker === stock.ticker)?.price;
    return { ...stock, price: livePrice };
  }).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Watchlist</h2>

      {loading && <p>Loading...</p>}

      {sortedWatchedStocks.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Ticker</th>
              <th className="text-left">Name</th>
              <th className="text-left">Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedWatchedStocks.map((stock) => (
              <StockEntryRow
                key={stock.ticker}
                ticker={stock.ticker}
                name={stock.name}
                price={stock.price}
                actions={
                  <button
                    className="underline cursor-pointer mx-4 mt-2"
                    onClick={() => onUnWatchStock(stock.ticker)}
                  >
                    UnWatch
                  </button>
                }
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;