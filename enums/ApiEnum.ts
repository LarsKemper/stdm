import { serverUrl, apiVersion } from '@lib/constants';

const apiBase = `${serverUrl}/${apiVersion}`;

export enum API {
  REGISTER = 'auth/register',
  LOGIN = 'auth/login',
  PLAYERS = 'players',
  TEAMS = 'teams',
  LEAGUES = 'leagues',
  VIEWS = 'views',
}

export const routes = {
  register: (): string => `${apiBase}/${API.REGISTER}`,
  login: (): string => `${apiBase}/${API.LOGIN}`,
  players: (): string => `${apiBase}/${API.PLAYERS}`,
  teams: (id?: string): string =>
    `${apiBase}/${API.TEAMS}${id ? `/${id}` : ''}`,
  leagues: (): string => `${apiBase}/${API.LEAGUES}`,
  views: (extension: string): string => `${apiBase}/${API.VIEWS}/${extension}`,
};
