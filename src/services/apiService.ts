import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { DateTime } from 'luxon';

const apiKey = process.env.POLYGON_API_KEY ?? 'wm4wmhwYXyiSSvRBM6JUXFNWDnkVUbUX' // for the sake of assessment only. Normally, this would come from env only
const baseUrl = 'https://api.polygon.io/v3';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey,
  }
});

// disable eslint no any type rule
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockResponse = (data: any) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
});


instance.interceptors.request.use(async (config) => {
  if (config.url?.startsWith('/last/trade/')) {
    // Mock response for live price endpoint
    const mockResponse = createMockResponse({
      status: 'OK',
      ticker: config.url.split('/').pop(),
      last: {
        price: Math.random() * 100 + 50, // Generate a random price between 50 and 150
        size: 100,
        timestamp: Date.now(),
      },
      request_id: 'mocked_request_id',
    })

    if (mockResponse) {
      config.adapter = async () => mockResponse.data;
    }
  } else if (config.url?.startsWith('/aggs/ticker/')) {
    // Mock response for historical data
    const mockResponse = createMockResponse({
      status: 'OK',
      ticker: config.url.split('/')[3],
      queryCount: 1,
      resultsCount: 5,
      adjusted: true,
      results: getRandomHistoricalData('01 Apr 2017 00:00 Z', 60),
    })

    if (mockResponse) {
      config.adapter = async () => mockResponse.data;
    }
  }

  return config;
});


instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    // Normally, there would be a toast/notification service call here
    if (error.error.messages)
      alert(error.error.messages.join('\n'));
    else alert('An error occurred. Please try again.');

    return Promise.reject(error);
  }
);

export const APIService = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
  },
};

export default APIService;


const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

const randomBar = (date: DateTime, lastClose: number) => {
  const open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  const close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  const high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
  const low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);

  return {
    x: date.valueOf(),
    o: open,
    h: high,
    l: low,
    c: close,
  };
};


const getRandomHistoricalData = (dateStr: string, count: number) => {
  let date = DateTime.fromRFC2822(dateStr);
  const data = [randomBar(date, 30)];

  while (data.length < count) {
    date = date.plus({ days: 1 });
    if (date.weekday <= 5) {
      data.push(randomBar(date, data[data.length - 1].c));
    }
  }
  return data;
};
