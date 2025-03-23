export interface StockItem {
  ticker: string;
  name: string;
  price?: number;
}

export interface PolygonSearchResponse {
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

export interface PolygonHistoricalDataResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results?: {
    x: number; // Timestamp (milliseconds since epoch)
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

export interface PolygonLatestTradeResponse {
  status: string;
  ticker: string;
  last: {
    price: number;
    size: number;
    timestamp: number;
  };
  request_id: string;
}