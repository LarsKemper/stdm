import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import HomeLayout from '@modules/layout/HomeLayout';
import WaitForAuth from '@modules/auth/WaitForAuth';
import ClientOnly from '@components/ClientOnly';
import StPageTitle from '@components/StPageTitle';

function HomePage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')}>
          <StPageTitle
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
          />
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default HomePage;
