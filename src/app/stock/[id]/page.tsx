'use client';

import StockService from '@/services/StocksService';
import { CategoryScale, Chart, LinearScale, registerables, TimeScale, Tooltip } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PolygonHistoricalDataResponse } from '@/types';

Chart.register(...registerables, CandlestickController, CandlestickElement, TimeScale, LinearScale, CategoryScale, Tooltip);

const CandlestickChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [stockData, setStockData] = useState<PolygonHistoricalDataResponse['results']>();
  const [loading, setLoading] = useState(true);

  const { id: ticker } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StockService.getHistoricalData('APLE');
        // @ts-expect-error axios typing is not compatible with the actual response type
        setStockData(data.results || []);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || stockData?.length === 0) return;

    const chartCtx = chartRef.current.getContext('2d');
    if (!chartCtx) return;

    const chartInstance = new Chart(chartCtx, {
      type: 'candlestick',
      data: {
        labels: stockData?.map((item) => item.x),
        datasets: [
          {
            label: 'Stock Price',
            data: stockData,
            borderColor: '#9c9c9c',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            grid: {
              color: '#9c9c9c',
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: '#B0B0B0',
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [stockData]);

  if (loading) return <>Loading...</>
  return (
    <div className="p-4">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">{ticker}&nbsp;Stock Price Chart</h1>
      <div style={{ height: '400px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default CandlestickChart;
