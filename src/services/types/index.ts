interface StockItem {
  ticker: string;
  name: string;
  price?: number;
}

interface PolygonSearchResponse {
  results?: {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    last_updated_utc: string;
  }[];
  status: string;
  request_id: string;
  count: number;
}

interface PolygonHistoricalDataResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results?: {
    o: number; // Open price
    h: number; // High price
    l: number; // Low price
    c: number; // Close price
    v: number; // Volume
    t: number; // Timestamp (milliseconds since epoch)
    vw: number; // Volume Weighted Average Price
    n: number; // Number of transactions
  }[];
  status: string;
  request_id: string;
}

interface PolygonLatestTradeResponse {
  status: string;
  ticker: string;
  last: {
    price: number;
    size: number;
    timestamp: number;
  };
  request_id: string;
}

// interface AlphaSearchResponse {
//   bestMatches?: {
//     '1. symbol': string;
//     '2. name': string;
//   }[];
// }

// interface AlphaQuoteResponse {
//   'Global Quote': {
//     '05. price': string;
//   };
// }

// interface AlphaHistoricalDataResponse {
//   'Time Series (Daily Adjusted)': {
//     [date: string]: {
//       '1. open': string;
//       '2. high': string;
//       '3. low': string;
//       '4. close': string;
//       '5. adjusted close': string;
//       '6. volume': string;
//     };
//   };
// }
