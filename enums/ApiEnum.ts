import { serverUrl, apiVersion } from '@lib/constants';

const apiBase = `${serverUrl}/${apiVersion}`;

export enum API {
  REGISTER = 'auth/register',
  LOGIN = 'auth/login',
}

export const routes = {
  register: (): string => `${apiBase}/${API.REGISTER}`,
  login: (): string => `${apiBase}/${API.LOGIN}`,
};
