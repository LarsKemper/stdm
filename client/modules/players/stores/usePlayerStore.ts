import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Player } from '@stTypes/index';

interface PlayerStoreState {
  players: Array<Player>;
  names: string[];
}

const initial: PlayerStoreState = {
  players: [],
  names: [],
};

export const usePlayerStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
