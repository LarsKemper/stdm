import React, { ReactNode } from 'react';
import { Container, createStyles, Text } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
  },

  league: {
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
}));

interface StPageTitleProps {
  title: string;
  description: string;
  action?: ReactNode;
}

function StPageTitle(props: StPageTitleProps) {
  const { classes } = useStyles();

  return (
    <Container className={classes.inner}>
      <div className={classes.league}>
        <div className={classes.logo}>
          <h2 className={classes.title}>{props.title}</h2>
          {props.action && props.action}
        </div>
        <Text size="xs" color="dimmed" className={classes.description}>
          {props.description}
        </Text>
      </div>
    </Container>
  );
}

export default StPageTitle;
