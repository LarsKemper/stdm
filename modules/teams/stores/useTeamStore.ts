import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Team } from '@stTypes/index';

interface TeamStoreState {
  teams: Array<Team>;
  names: string[];
}

const initial: TeamStoreState = {
  teams: [],
  names: [],
};

export const useTeamStore = create(
  combine(initial, (set) => ({
    set,
  }))
);
