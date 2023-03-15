import { createStyles } from '@mantine/core';

export const teamListPageStyles = createStyles((theme) => ({
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
