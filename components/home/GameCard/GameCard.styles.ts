import { createStyles } from '@mantine/core';

export const gameCardStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  card: {
    cursor: 'pointer',
    '&:hover': {
      transition: '0.2s',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  score: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: theme.radius.sm,
  },
}));
