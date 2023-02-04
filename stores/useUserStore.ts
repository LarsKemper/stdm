import { isServer } from '@lib/constants';
import { User } from '@stTypes/index';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const userKey = '@st/user';

const initial = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

const getDefaultValeus = (): User => {
  if (!isServer) {
    try {
      const user = localStorage.getItem(userKey);

      if (user !== null) {
        return JSON.parse(user);
      }
    } catch {}
  }

  return initial;
};

export const useUserStore = create(
  combine(getDefaultValeus(), (set) => ({
    setUser: (x: User) => {
      try {
        localStorage.setItem(userKey, JSON.stringify(x));
      } catch {}

      set(x);
    },
    reset() {
      try {
        localStorage.removeItem(userKey);
      } catch {}

      set(initial);
    },
  }))
);
