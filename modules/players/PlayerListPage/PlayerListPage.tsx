import React, { useEffect, useContext, useState } from 'react';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StPageTitle from '@components/shared/StPageTitle/StPageTitle';
import { Container, Grid, Text } from '@mantine/core';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import { playerListPageStyles } from '@modules/players/PlayerListPage/PlayerListPage.styles';
import StListLoader from '@components/shared/StListLoader';
import StSkeletonList from '@components/shared/StSkeletonList';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';
import { usePlayerStore } from '@modules/players/stores/usePlayerStore';
import usePlayersService from '@modules/players/services/usePlayersService';
import { Player } from '@stTypes/index';
import { useDebouncedState } from '@mantine/hooks';
import StCard from '@components/shared/StCard/StCard';
import StCardSkeleton from '@components/shared/StCard/StCardSkeleton';
import StSearch from '@components/shared/StSearch';

const useStyles = playerListPageStyles;

function PlayerListPage() {
  const playerStore = usePlayerStore();
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { classes } = useStyles();
  const { loading, getPlayers } = usePlayersService();
  const { mounted } = useContext(MountedContext);
  const [term, setTerm] = useDebouncedState('', 200);
  const [players, setPlayers] = useState<Player[]>(playerStore.players);

  useEffect(() => {
    if (!term || term === '') {
      return setPlayers(playerStore.players);
    }

    setPlayers(players.filter((player) => player.name.startsWith(term)));
  }, [term, playerStore.players]);

  useEffect(() => {
    getPlayers().catch();
  }, [mounted]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('players-list.page-title')}>
          <Container>
            <StPageTitle
              title={t('players-list.title')}
              description={t('players-list.description')}
            />
            <StSearch onChange={setTerm} data={playerStore.names} />
          </Container>
          <Container mt={40} mb={40} className={classes.inner}>
            <StListLoader
              listLength={playerStore.players.length}
              loading={loading}
              skeletonList={
                <Grid gutter="lg">
                  <StSkeletonList length={6} skeleton={<StCardSkeleton />} />
                </Grid>
              }
              emptyCard={
                <StEmptyList
                  title={t('players-list.empty.title')}
                  subTitle={t('players-list.empty.sub-title')}
                />
              }
            >
              <Grid gutter="lg">
                {players.length > 0 ? (
                  players.map((player) => {
                    return (
                      <StCard
                        key={player.id}
                        id={player.id}
                        image={player.avatarUrl}
                        topLevelLink={'/players/'}
                        topLine={`${player.number} - ${player.position}`}
                        title={player.name}
                        date={player.birthDate}
                      />
                    );
                  })
                ) : (
                  <Text ml="xs">{t('search.no-result')}</Text>
                )}
              </Grid>
            </StListLoader>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default PlayerListPage;
