import React, { ReactNode } from 'react';
import { Text } from '@mantine/core';
import { stPageTitleStyles } from '@components/shared/StPageTitle/StPageTitle.styles';

const useStyles = stPageTitleStyles;

interface StPageTitleProps {
  title: string;
  description: string;
  action?: ReactNode;
}

function StPageTitle(props: StPageTitleProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.pageTitle}>
      <div className={classes.titleContainer}>
        <h2 data-testid="ci-page-title-title" className={classes.title}>
          {props.title}
        </h2>
        {props.action ? (
          <div data-testid="ci-page-title-title" className={classes.action}>
            {props.action}
          </div>
        ) : null}
      </div>
      <Text
        data-testid="ci-page-title-description"
        size="xs"
        color="dimmed"
        className={classes.description}
      >
        {props.description}
      </Text>
    </div>
  );
}

export default StPageTitle;
