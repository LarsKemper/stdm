import { createStyles } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

export const stPageTitleStyles = createStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  pageTitle: {
    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  title: {
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

  description: {
    marginTop: 2,
    fontSize: 18,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  action: {
    padding: theme.spacing.sm,
  },
}));
