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
import { teamsPageStyles } from '@modules/teams/TeamsPage.styles';
import { useTeamStore } from '@modules/teams/stores/useTeamStore';
import useTeamsService from '@modules/teams/services/useTeamsService';
import StCardSkeleton from '@components/shared/StCard/StCardSkeleton';
import StCard from '@components/shared/StCard/StCard';

const useStyles = teamsPageStyles;

function TeamsPage() {
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
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <StPageTitle
              title={'Teams'}
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
              data={teamStore.names}
            />
          </Container>
          <Container mt={40} mb={40} className={classes.inner}>
            <StListLoader
              listLength={teamStore.teams.length}
              loading={loading}
              skeletonList={
                <Grid gutter="lg">
                  <StSkeletonList
                    length={6}
                    span={1}
                    skeleton={<StCardSkeleton />}
                  />
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
                {teams.length > 0 ? (
                  teams.map((team) => {
                    return (
                      <StCard
                        key={team.id}
                        imageSize={80}
                        imageMargin={20}
                        image={team.club?.logoUrl || ''}
                        topLine={team.name}
                        title={team.club?.name || ''}
                        bottomLine={team.club?.stadium}
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

export default TeamsPage;
