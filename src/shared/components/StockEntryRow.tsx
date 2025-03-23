import Link from 'next/link';


interface StockEntryRowProps {
  ticker: string;
  name: string;
  price?: number;
  actions?: React.ReactNode;
}


const StockEntryRow = ({ ticker, name, price, actions }: StockEntryRowProps) => {
  return (
    <tr key={ticker}>
      <td className="border px-4 py-2">{ticker}</td>
      <td className="border px-4 py-2">
        <Link href={`/stock/${ticker}`} className="text-blue-500">
          {name}
        </Link>
      </td>
      <td className="border px-4 py-2">
        {price ? `$${price.toFixed(2)}` : 'Loading...'}
      </td>
      <td className="border px-4 py-2">
        {actions}
      </td>
    </tr>
  );
};

export default StockEntryRow;