import React from 'react';
import { Paper, Group, Text, Avatar, Flex, Skeleton } from '@mantine/core';
import { gameCardStyles } from '@components/GameCard/GameCard.styles';

const useStyles = gameCardStyles;

function GameCardSkeleton() {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart" grow>
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
    </Paper>
  );
}

export default GameCardSkeleton;
