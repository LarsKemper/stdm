import { createStyles } from '@mantine/core';

export const gameEventCardStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  headline: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 18,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
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
