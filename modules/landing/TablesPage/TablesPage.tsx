import React, { useContext, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import HomeLayout from '@modules/layout/HomeLayout';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import StPageTitle from '@components/shared/StPageTitle/StPageTitle';
import { Container, Flex, Loader, Select } from '@mantine/core';
import LeagueTable from '@components/home/LeagueTable';
import useLeagueService from '@modules/landing/services/useLeagueService';
import { useTableStore } from '@modules/landing/stores/useTableStore';

function TablesPage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const tableStore = useTableStore();
  const { loading, getLeagues, getTable } = useLeagueService();
  const { mounted } = useContext(MountedContext);

  useEffect(() => {
    handleSelect(tableStore.selectedId).catch();
    getLeagues().catch();
  }, [mounted]);

  async function handleSelect(leagueId: string) {
    if (!leagueId || leagueId === '') {
      return;
    }

    await getTable(leagueId).catch();
  }

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <StPageTitle
              title="Tables"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
            />
            <Flex gap="sm" align="center" mt="xl" mb="xl">
              <Select
                value={tableStore.selectedId}
                onChange={handleSelect}
                style={{ width: '100%' }}
                disabled={loading}
                data={tableStore.leagues.map((league) => ({
                  label: league.name,
                  value: league.id,
                }))}
              />
              {loading && <Loader size="sm" />}
            </Flex>
            <LeagueTable positions={tableStore.table} leagueLoading={loading} />
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default TablesPage;
