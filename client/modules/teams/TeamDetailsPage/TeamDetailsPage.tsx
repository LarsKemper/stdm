import React, { useContext, useEffect, useState } from 'react';
import { teamDetailsPageStyles } from '@modules/teams/TeamDetailsPage/TeamDetailsPage.styles';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { Container, Group, Avatar, Text, Skeleton, Grid } from '@mantine/core';
import useTeamsService from '@modules/teams/services/useTeamsService';
import { useRouter } from 'next/router';
import { useTeamStore } from '@modules/teams/stores/useTeamStore';
import GameCardSkeleton from '@components/GameCard/GameCardSkeleton';
import StListLoader from '@components/shared/StListLoader';
import StSkeletonList from '@components/shared/StSkeletonList';
import GameCard from '@components/GameCard/GameCard';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';

const useStyles = teamDetailsPageStyles;

function TeamDetailsPage() {
  const [teamLoading, setTeamLoading] = useState<boolean>(true);
  const [gamesLoading, setGamesLoading] = useState<boolean>(true);
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const teamStore = useTeamStore();
  const { getGames, getTeams } = useTeamsService();
  const { mounted } = useContext(MountedContext);
  const router = useRouter();

  const loading = teamLoading || gamesLoading;

  useEffect(() => {
    if (!router.query.teamId) {
      return router.back();
    }

    getTeams(router.query.teamId as string).then(() => setTeamLoading(false));
    getGames(router.query.teamId as string).then(() => setGamesLoading(false));
  }, [mounted, router]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('team-details.page-title')}>
          <Container>
            <Group mb="xl">
              {!loading && teamStore.team && teamStore.team.club ? (
                <>
                  <Avatar
                    src={teamStore.team.club.logoUrl}
                    alt={teamStore.team.club.name}
                    size="xl"
                    radius="xl"
                  />
                  <div>
                    <Text className={classes.teamName}>
                      {teamStore.team.club.name}
                    </Text>
                    <Text className={classes.stadium} c="dimmed">
                      {teamStore.team.name} - {teamStore.team.club.stadium}
                    </Text>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton width={84} height={84} radius="xl" />
                  <div>
                    <Skeleton width={170} height={28} />
                    <Skeleton mt="xs" width={150} height={25} />
                  </div>
                </>
              )}
            </Group>
            <StListLoader
              listLength={teamStore.games.length}
              loading={loading}
              skeletonList={
                <Grid gutter="lg">
                  <StSkeletonList
                    length={4}
                    span={12}
                    skeleton={<GameCardSkeleton />}
                  />
                </Grid>
              }
              emptyCard={
                <StEmptyList
                  title={t('team-details.empty.title')}
                  subTitle={t('team-details.empty.sub-title')}
                />
              }
            >
              <Grid gutter="lg">
                {teamStore.games.length > 0 &&
                  teamStore.games.map((game) => {
                    return <GameCard key={game.id} game={game} />;
                  })}
              </Grid>
            </StListLoader>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default TeamDetailsPage;
