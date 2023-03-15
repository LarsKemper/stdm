import { apiVersion } from '../../lib/contants';

export enum ApiRoutes {
  AUTH = '/auth',
  PLAYERS = '/players',
  TEAMS = '/teams',
}

/**
 * Build the route with the api version
 *
 * @param {ApiRoutes} route Basic route
 * @returns {string} Complete api route
 */
export function route(route: ApiRoutes): string {
  return `/api/${apiVersion}${route}`;
}
