import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { GameEvent, GameViewItem } from '@stTypes/index';

interface GameStoreState {
  game: GameViewItem | null;
  games: Array<GameViewItem>;
  events: Array<GameEvent>;
}

const initial: GameStoreState = {
  game: null,
  games: [],
  events: [],
};

export const useGameStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
