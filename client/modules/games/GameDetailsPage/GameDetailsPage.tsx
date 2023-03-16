import React, { useContext, useEffect, useState } from 'react';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import HomeLayout from '@modules/layout/HomeLayout';
import { Avatar, Container, Flex, Grid, Group, Text } from '@mantine/core';
import { gameDetailsPageStyles } from '@modules/games/GameDetailsPage/GameDetailsPage.styles';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { useGameStore } from '@modules/games/stores/useGameStore';
import useGamesService from '@modules/games/services/useGamesService';
import { useRouter } from 'next/router';
import GameCardSkeleton from '@components/home/GameCard/GameCardSkeleton';
import {
  FactTableType,
  StFactTable,
} from '@components/shared/StFactTable/StFactTable';
import GameEventCard from '@components/home/GameEventCard/GameEventCard';
import StSkeletonList from '@components/shared/StSkeletonList';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';
import StListLoader from '@components/shared/StListLoader';

const useStyles = gameDetailsPageStyles;

function GameDetailsPage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { classes } = useStyles();
  const gameStore = useGameStore();
  const { getGame, getEvents } = useGamesService();
  const [gameLoading, setGameLoading] = useState<boolean>(true);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const { mounted } = useContext(MountedContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.gameId) {
      return router.back();
    }

    getGame(router.query.gameId as string).then(() => setGameLoading(false));
    getEvents(router.query.gameId as string).then(() =>
      setEventsLoading(false)
    );
  }, [mounted, router]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('game-details.page-title')}>
          <Container>
            {gameLoading || !gameStore.game ? (
              <Group mb="xl" position="center">
                <GameCardSkeleton hasCard={false} big center />
              </Group>
            ) : (
              <Group mb="xl" p="md" position="apart" grow>
                <Flex align="center" justify="flex-end">
                  <div>
                    <Text className={classes.teamName}>
                      {gameStore.game.homeTeam}
                    </Text>
                    <Text className={classes.label} c="dimmed">
                      {gameStore.game.homeClub}
                    </Text>
                  </div>
                  <Avatar
                    size="xl"
                    mx="md"
                    src={gameStore.game.homeClubLogo}
                    alt={gameStore.game.homeClub}
                    radius="xl"
                  />
                  <Flex
                    className={classes.score}
                    px="lg"
                    py={8}
                    align="center"
                    justify="center"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text className={classes.label}>
                      {gameStore.game.homeClub.charAt(0)}
                    </Text>
                    <Text className={classes.label}>
                      {gameStore.game.homeGoals}
                    </Text>
                  </Flex>
                </Flex>
                <Flex align="center" justify="flex-start">
                  <Flex
                    className={classes.score}
                    px="lg"
                    py={8}
                    align="center"
                    justify="center"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text className={classes.label}>
                      {gameStore.game.awayClub.charAt(0)}
                    </Text>
                    <Text className={classes.label}>
                      {gameStore.game.awayGoals}
                    </Text>
                  </Flex>
                  <Avatar
                    size="xl"
                    mx="md"
                    src={gameStore.game.awayClubLogo}
                    alt={gameStore.game.awayClub}
                    radius="xl"
                  />
                  <div>
                    <Text className={classes.teamName}>
                      {gameStore.game.awayTeam}
                    </Text>
                    <Text className={classes.label} c="dimmed">
                      {gameStore.game.awayClub}
                    </Text>
                  </div>
                </Flex>
              </Group>
            )}
            <Group mb="xl">
              <StFactTable
                loading={gameLoading}
                facts={[
                  {
                    label: t('game-details.facts.stadium'),
                    value: gameStore.game?.stadium,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('game-details.facts.address'),
                    value: gameStore.game?.address,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('game-details.facts.reff'),
                    value: gameStore.game?.reffereeName,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('game-details.facts.gameDay'),
                    value: gameStore.game?.gameday.toString(),
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('game-details.facts.season'),
                    value: gameStore.game?.season,
                    type: FactTableType.TEXT,
                  },
                ]}
              />
            </Group>
            <StListLoader
              listLength={gameStore.events.length}
              loading={eventsLoading}
              skeletonList={<></>}
              emptyCard={<></>}
            >
              <Grid gutter="lg" mb="xl">
                {gameStore.events.length > 0 &&
                  gameStore.events.map((event) => {
                    return (
                      <GameEventCard
                        key={event.id}
                        homeTeamId={gameStore.game?.homeTeamId || ''}
                        event={event}
                      />
                    );
                  })}
              </Grid>
            </StListLoader>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default GameDetailsPage;
