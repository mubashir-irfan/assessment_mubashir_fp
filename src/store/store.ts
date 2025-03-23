// lib/store.ts
import { create } from 'zustand';

interface StockEntry {
  ticker: string;
  name: string;
  price?: number;
  createdAt: number;
}

interface State {
  watchedStocks: StockEntry[];
  watchStock: (stockEntry: Omit<StockEntry, 'createdAt'>) => void;
  unwatchStock: (ticker: string) => void;
}

export const useStore = create<State>((set) => ({
  watchedStocks: [],
  watchStock: (stockEntry) =>
    set((state) => ({
      watchedStocks: [
        ...state.watchedStocks,
        { ...stockEntry, createdAt: Date.now() },
      ],
    })),
  unwatchStock: (ticker) =>
    set((state) => ({
      watchedStocks: state.watchedStocks.filter((stock) => stock.ticker !== ticker),
    })),
}));