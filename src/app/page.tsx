import Stocks from "./_components/Stocks";
import Watchlist from "./_components/WatchList";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="p-2 max-w-[1280px] text-center bg-yellow-200 rounded-lg shadow-md mx-auto text-black mb-8">
          <p>The Polygon Free API tier has a limit of 5 requests per minute. Hence, live price API is mocked, and the whole stock entry is kept in the store for watch list.
            Normally, only tickers would have been watched. And the "watched" information would be stored on server-side, with server-state connected through tools like React Query.</p>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8 md:justify-between w-full max-w-[1280px] md:mx-auto">
          <div className="md:w-1/2">
            <Stocks />
          </div>
          <div className="md:w-1/2 md:border-l md:border-slate-300 md:pl-8">
            <Watchlist />
          </div>
        </div>
      </main>
    </div>
  );
}
