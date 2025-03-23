import { APIService } from '.';
import { PolygonSearchResponse, PolygonHistoricalDataResponse, PolygonLatestTradeResponse } from '@/types';

async function searchStocks(query: string): Promise<PolygonSearchResponse['results']> {
  return APIService.get<PolygonSearchResponse>('/reference/tickers', { params: { search: query } }).then(data => data.data.results || []);
}

async function getStockHistoricalDataServer(ticker: string): Promise<PolygonHistoricalDataResponse['results']> {
  const today = new Date().toISOString().split('T')[0];
  return APIService.get<PolygonHistoricalDataResponse>(`/aggs/ticker/${ticker}/range/1/day/2023-01-01/${today}`, { params: { adjusted: true, sort: 'asc', limit: 120 } }).then(data => data.data.results || []);
}

async function getStockLatestPrice(ticker: string): Promise<PolygonLatestTradeResponse['last']> {
  // @ts-expect-error axios response type is not compatible with the actual response type
  const response: PolygonLatestTradeResponse = await APIService.get<PolygonLatestTradeResponse>(`/last/trade/${ticker}`);
  return response.last;
}

async function getHistoricalData(ticker: string): Promise<PolygonHistoricalDataResponse['results']> {
  const url = `/aggs/ticker/${ticker}/range/1/day/2023-10-23/2023-10-27`;
  // @ts-expect-error axios response type is not compatible with the actual response type
  const response: PolygonHistoricalDataResponse['results'] = APIService.get<PolygonHistoricalDataResponse>(url)
  return response
}

const StockService = {
  searchStocks,
  getStockLatestPrice,
  getHistoricalData,
  getStockHistoricalDataServer
};

export default StockService;