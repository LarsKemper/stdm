import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Player } from '@stTypes/index';

interface PlayerStoreState {
  players: Array<Player>;
}

const initial: PlayerStoreState = {
  players: [],
};

export const usePlayerStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
