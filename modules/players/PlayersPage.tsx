import React from 'react';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StPageTitle from '@components/StPageTitle/StPageTitle';
import { Container } from '@mantine/core';
import ClientOnly from '@components/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';

function PlayersPage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')}>
          <Container>
            <StPageTitle title={'title'} description={'desc'} />
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default PlayersPage;
