import { createStyles } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

export const gameDetailsPageStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  score: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: theme.radius.sm,
  },

  teamName: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 28,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  label: {
    marginTop: 2,
    fontSize: 18,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },
}));
