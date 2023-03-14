import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { TableRow } from '@stTypes/index';

export type LeagueStoreState = {
  id: string;
  name: string;
  table: TableRow[];
};

const initial: LeagueStoreState = {
  id: '',
  name: '',
  table: [],
};

export const useLeagueStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
