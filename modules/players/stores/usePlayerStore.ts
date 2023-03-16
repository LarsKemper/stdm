import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Player } from '@stTypes/index';

interface PlayerStoreState {
  player: Player | null;
  players: Array<Player>;
  names: string[];
}

const initial: PlayerStoreState = {
  player: null,
  players: [],
  names: [],
};

export const usePlayerStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
