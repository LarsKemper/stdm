import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Team } from '@stTypes/index';

interface TeamStoreState {
  team: Team | null;
  teams: Array<Team>;
  names: string[];
}

const initial: TeamStoreState = {
  team: null,
  teams: [],
  names: [],
};

export const useTeamStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
