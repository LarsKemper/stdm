import { createStyles, Loader } from '@mantine/core';
import React from 'react';
import StHead from './StHead';

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

function StFullScreenLoader() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <StHead title="Loading..." />
      <Loader color="red" size="xl" />
    </div>
  );
}

export default StFullScreenLoader;
