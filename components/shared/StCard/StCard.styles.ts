import { createStyles } from '@mantine/core';

export const stCardStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    minWidth: 413,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  image: {
    overflow: 'hidden',
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
