import React from 'react';
import { Paper, Text, Flex, Grid, Avatar } from '@mantine/core';
import { gameEventCardStyles } from '@components/home/GameEventCard/GameEventCard.styles';
import { IconBallFootball, IconDiamonds } from '@tabler/icons';
import { GameEvent } from '@stTypes/index';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

interface GameEventCardProps {
  event: GameEvent;
  homeTeamId: string;
}

export enum GameEventTypes {
  GOAL = 'GOAL',
  YELLOW = 'YELLOW',
  RED = 'RED',
}

const useStyles = gameEventCardStyles;

function GameEventCard(props: GameEventCardProps) {
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { classes } = useStyles();

  return (
    <Grid.Col span={12}>
      <Paper
        style={
          props.homeTeamId === props.event.teamId
            ? { borderLeft: '5px solid #d3010c' }
            : { borderRight: '5px solid #d3010c' }
        }
        withBorder
        p="md"
        radius="md"
      >
        <Flex direction="column" justify="flex-start">
          <Flex mb="xs" align="center" justify="flex-start">
            <Text w={40} px="sm" className={classes.headline}>
              {props.event.minute}'
            </Text>
            <Text ml="xl" className={classes.headline}>
              {t(`game-details.event.${props.event.event}`)}
            </Text>
          </Flex>
          <Flex align="center" justify="flex-start">
            <Flex w={40}>
              {props.event.event === GameEventTypes.GOAL && (
                <IconBallFootball size={35} />
              )}
              {props.event.event === GameEventTypes.YELLOW && (
                <IconDiamonds fill={'yellow'} size={40} />
              )}
              {props.event.event === GameEventTypes.RED && (
                <IconDiamonds fill={'red'} size={40} />
              )}
            </Flex>
            <Flex justify="start" align="center">
              <Avatar
                size="lg"
                mx="md"
                src={props.event.activePlayer?.avatarUrl}
                alt={props.event.activePlayer?.name}
                radius="xl"
              />
              <Text>{props.event.activePlayer?.name}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Grid.Col>
  );
}

export default GameEventCard;
