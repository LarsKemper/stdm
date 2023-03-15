import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { League } from '@stTypes/index';
import { LeagueTablePosition } from '@components/home/LeagueTable';

export type TableStoreState = {
  id: string;
  selectedId: string;
  table: LeagueTablePosition[];
  leagues: League[];
};

const initial: TableStoreState = {
  id: '',
  selectedId: '',
  table: [],
  leagues: [],
};

export const useTableStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
