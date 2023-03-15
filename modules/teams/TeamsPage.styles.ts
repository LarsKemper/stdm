import { createStyles } from '@mantine/core';

export const teamsPageStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  skeleton: {
    width: '100%',
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));
