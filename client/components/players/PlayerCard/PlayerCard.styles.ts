import { createStyles } from '@mantine/core';

export const playerCardStyles = createStyles((theme) => ({
  card: {
    minWidth: 413,
    overflow: 'visible',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));
