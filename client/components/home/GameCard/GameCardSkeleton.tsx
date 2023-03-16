import React from 'react';
import { Paper, Group, Flex, Skeleton } from '@mantine/core';
import { gameCardStyles } from '@components/home/GameCard/GameCard.styles';

const useStyles = gameCardStyles;

interface GameCardSkeletonProps {
  hasCard?: boolean;
  big?: boolean;
  center?: boolean;
}

function GameCardSkeleton(props: GameCardSkeletonProps) {
  if (!props.hasCard) {
    return <SkeletonComponent />;
  }

  return (
    <Paper withBorder p="md" radius="md">
      <SkeletonComponent {...props} />
    </Paper>
  );
}

function SkeletonComponent(props: GameCardSkeletonProps) {
  const { classes } = useStyles();

  return (
    <Group
      position="apart"
      grow
      {...(props.center && { align: 'center', justify: 'center' })}
    >
      <Flex align="center" justify="flex-end">
        <div>
          <Skeleton width={150} height={28} mb={5} />
          <Skeleton width={50} height={18} />
        </div>
        <Skeleton width={56} height={56} radius="xl" mx="md" />
        <Skeleton
          width={50}
          height={55}
          px="xs"
          py={3}
          className={classes.score}
        />
      </Flex>
      <Flex align="center" justify="flex-start">
        <Skeleton
          width={50}
          height={55}
          px="xs"
          py={3}
          className={classes.score}
        />
        <Skeleton width={56} height={56} radius="xl" mx="md" />
        <div>
          <Skeleton width={150} height={28} mb={5} />
          <Skeleton width={50} height={18} />
        </div>
      </Flex>
    </Group>
  );
}

export default GameCardSkeleton;
