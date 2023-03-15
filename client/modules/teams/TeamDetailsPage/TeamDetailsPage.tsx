import React, { useContext, useEffect } from 'react';
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

const useStyles = teamDetailsPageStyles;

function TeamDetailsPage() {
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const teamStore = useTeamStore();
  const { getGames, getTeams, loading } = useTeamsService();
  const { mounted } = useContext(MountedContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.teamId) {
      return router.back();
    }

    getTeams(router.query.teamId as string).catch();
    getGames(router.query.teamId as string).catch();
  }, [mounted, router]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <Group mb="xl">
              {!loading && teamStore.team && teamStore.team.club ? (
                <>
                  <Avatar
                    src={teamStore.team.club.logoUrl}
                    size="xl"
                    alt={'author.name'}
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
              emptyCard={<div>empty</div>}
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
