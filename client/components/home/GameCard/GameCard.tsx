import React from 'react';
import { Paper, Group, Text, Flex, Grid, Avatar } from '@mantine/core';
import { gameCardStyles } from '@components/home/GameCard/GameCard.styles';
import { GameViewItem } from '@stTypes/index';
import Link from 'next/link';

interface GameCardProps {
  game: GameViewItem;
}

const useStyles = gameCardStyles;

function GameCard(props: GameCardProps) {
  const { classes } = useStyles();

  return (
    <Grid.Col span={12}>
      <Text>{new Date(props.game.date).toLocaleDateString()}</Text>
      <Link href={`/games/${props.game.id}`} passHref legacyBehavior>
        <Paper className={classes.card} withBorder p="md" radius="md">
          <Group position="apart" grow>
            <Flex align="center" justify="flex-end">
              <div>
                <Text fw={700} fz="xl">
                  {props.game.homeClub}
                </Text>
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="xs"
                  className={classes.label}
                >
                  {props.game.homeTeam}
                </Text>
              </div>
              <Avatar
                size="lg"
                mx="md"
                src={props.game.homeClubLogo}
                alt={props.game.homeClub}
                radius="xl"
              />
              <Flex
                className={classes.score}
                px="xs"
                py={3}
                align="center"
                justify="center"
                direction="column"
                wrap="wrap"
              >
                <Text>{props.game.homeClub.charAt(0)}</Text>
                <Text>{props.game.homeGoals}</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="flex-start">
              <Flex
                className={classes.score}
                px="xs"
                py={3}
                align="center"
                justify="center"
                direction="column"
                wrap="wrap"
              >
                <Text>{props.game.awayClub.charAt(0)}</Text>
                <Text>{props.game.awayGoals}</Text>
              </Flex>
              <Avatar
                size="lg"
                mx="md"
                src={props.game.awayClubLogo}
                alt={props.game.awayClub}
                radius="xl"
              />
              <div>
                <Text fw={700} fz="xl">
                  {props.game.awayClub}
                </Text>
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="xs"
                  className={classes.label}
                >
                  {props.game.awayTeam}
                </Text>
              </div>
            </Flex>
          </Group>
        </Paper>
      </Link>
    </Grid.Col>
  );
}

export default GameCard;
