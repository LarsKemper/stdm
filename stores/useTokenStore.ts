import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { isServer } from '@lib/constants';

export const tokenKey = '@st/token';

const initial = {
  token: '',
};

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        token: localStorage.getItem(tokenKey) || '',
      };
    } catch {}
  }

  return initial;
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setToken: (x: { token: string }) => {
      try {
        localStorage.setItem(tokenKey, x.token);
      } catch {}

      set(x);
    },
    reset() {
      try {
        localStorage.removeItem(tokenKey);
      } catch {}

      set(initial);
    },
  }))
);
