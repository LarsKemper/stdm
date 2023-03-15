import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { GameViewItem, Team } from '@stTypes/index';

interface TeamStoreState {
  team: Team | null;
  games: Array<GameViewItem>;
  teams: Array<Team>;
  names: string[];
}

const initial: TeamStoreState = {
  team: null,
  games: [],
  teams: [],
  names: [],
};

export const useTeamStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
