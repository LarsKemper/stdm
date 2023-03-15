import { createStyles } from '@mantine/core';

export const playersPageStyles = createStyles((theme) => ({
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
}));
