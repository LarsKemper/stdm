import React, { useEffect, useContext, useState } from 'react';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StPageTitle from '@components/shared/StPageTitle/StPageTitle';
import { Container, Grid, Autocomplete, Text } from '@mantine/core';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import { playersPageStyles } from '@modules/players/PlayersPage.styles';
import StListLoader from '@components/shared/StListLoader';
import StSkeletonList from '@components/shared/StSkeletonList';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';
import { usePlayerStore } from '@modules/players/stores/usePlayerStore';
import usePlayersService from '@modules/players/services/usePlayersService';
import { IconSearch } from '@tabler/icons';
import { Player } from '@stTypes/index';
import { useDebouncedState } from '@mantine/hooks';
import StCard from '@components/shared/StCard/StCard';
import StCardSkeleton from '@components/shared/StCard/StCardSkeleton';

const useStyles = playersPageStyles;

function PlayersPage() {
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
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <StPageTitle
              title={'Players'}
              description={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam\n'
              }
            />
            <Autocomplete
              onChange={setTerm}
              mt="xl"
              className={classes.search}
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              data={playerStore.names}
            />
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
                  title={t('empty-sketch-list.title')}
                  subTitle={t('empty-sketch-list.sub-title')}
                  description={t('empty-sketch-list.description')}
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
                        topLine={player.number}
                        title={player.name}
                        date={player.birthDate}
                      />
                    );
                  })
                ) : (
                  <Text ml="xs">No result for your input</Text>
                )}
              </Grid>
            </StListLoader>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default PlayersPage;
