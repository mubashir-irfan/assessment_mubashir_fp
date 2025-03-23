// components/StockItemsListing.tsx
import { StockEntryRow } from '@/shared/components';
import { StockItem } from '@/types';

interface StockItemsListingProps {
  stockItems: StockItem[];
  onWatchStock: (stock: StockItem) => void;
}

export default function StocksList({ stockItems, onWatchStock }: StockItemsListingProps) {
  return (
    <div>
      {stockItems.length > 0 && (
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="text-left">Ticker</th>
              <th className="text-left">Name</th>
              <th className="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <StockEntryRow key={item.ticker} {...item} actions={<button className="underline cursor-pointer" onClick={() => onWatchStock(item)}>
                Watch
              </button>} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}