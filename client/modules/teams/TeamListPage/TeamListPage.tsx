import React, { useEffect, useContext, useState } from 'react';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StPageTitle from '@components/shared/StPageTitle/StPageTitle';
import { Container, Grid, Autocomplete, Text } from '@mantine/core';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import StListLoader from '@components/shared/StListLoader';
import StSkeletonList from '@components/shared/StSkeletonList';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';
import { IconSearch } from '@tabler/icons';
import { Team } from '@stTypes/index';
import { useDebouncedState } from '@mantine/hooks';
import { teamListPageStyles } from '@modules/teams/TeamListPage/TeamListPage.styles';
import { useTeamStore } from '@modules/teams/stores/useTeamStore';
import useTeamsService from '@modules/teams/services/useTeamsService';
import StCardSkeleton from '@components/shared/StCard/StCardSkeleton';
import StCard from '@components/shared/StCard/StCard';
import StSearch from '@components/shared/StSearch';

const useStyles = teamListPageStyles;

function TeamListPage() {
  const teamStore = useTeamStore();
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { classes } = useStyles();
  const { loading, getTeams } = useTeamsService();
  const { mounted } = useContext(MountedContext);
  const [term, setTerm] = useDebouncedState('', 200);
  const [teams, setTeams] = useState<Team[]>(teamStore.teams);

  useEffect(() => {
    if (!term || term === '') {
      return setTeams(teamStore.teams);
    }

    setTeams(
      teams.filter((team) => {
        return team.name.startsWith(term) || team.club?.name.startsWith(term);
      })
    );
  }, [term, teamStore.teams]);

  useEffect(() => {
    getTeams().catch();
  }, [mounted]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('team-list.page-title')}>
          <Container>
            <StPageTitle
              title={t('team-list.title')}
              description={t('team-list.description')}
            />
            <StSearch onChange={setTerm} data={teamStore.names} />
          </Container>
          <Container mt={40} mb={40} className={classes.inner}>
            <StListLoader
              listLength={teamStore.teams.length}
              loading={loading}
              skeletonList={
                <Grid gutter="lg">
                  <StSkeletonList length={6} skeleton={<StCardSkeleton />} />
                </Grid>
              }
              emptyCard={
                <StEmptyList
                  title={t('team-list.empty.title')}
                  subTitle={t('team-list.empty.sub-title')}
                />
              }
            >
              <Grid gutter="lg">
                {teams.length > 0 ? (
                  teams.map((team) => {
                    return (
                      <StCard
                        key={team.id}
                        id={team.id}
                        imageSize={80}
                        imageMargin={20}
                        image={team.club?.logoUrl || ''}
                        topLine={team.name}
                        topLevelLink={'/teams/'}
                        title={team.club?.name || ''}
                        bottomLine={team.club?.stadium}
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

export default TeamListPage;
