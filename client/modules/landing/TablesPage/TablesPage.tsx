import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import HomeLayout from '@modules/layout/HomeLayout';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import ClientOnly from '@components/ClientOnly';
import StPageTitle from '@components/StPageTitle/StPageTitle';
import { Container, Select } from '@mantine/core';
import LeagueTable from "@components/home/LeagueTable";
import useLeagueService from "@modules/landing/services/useLeagueService";

function TablesPage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { loading } = useLeagueService();

  const leagues = [
    {
      label: 'Bundesliga',
      value: 'sds',
    },
  ];

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <StPageTitle
              title="Tables"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
            />
            <Select mt="xl" label="Select league" data={leagues} />
            <LeagueTable />
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default TablesPage;
