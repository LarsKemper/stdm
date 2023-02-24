import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import HomeHeader from '@components/home/HomeHeader/HomeHeader';
import StHead from '@components/StHead';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

interface HomeLayoutProps {
  children: ReactNode;
  title: string;
}

const HomeFooter = dynamic(() => import('@components/home/HomeFooter'));

function HomeLayout(props: HomeLayoutProps) {
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  console.log(t('header.item-tables-label'));

  const links: { link: string; label: string }[] = [
    {
      link: '/',
      label: t('header.item-tables-label'),
    },
    {
      link: '/leagues',
      label: t('header.item-leagues-label'),
    },
    {
      link: '/teams',
      label: t('header.item-teams-label'),
    },
    {
      link: '/players',
      label: t('header.item-players-label'),
    },
  ];

  return (
    <>
      <StHead title={props.title} />
      <div style={{ minHeight: '100vh' }}>
        <HomeHeader links={links} />
        <div>{props.children}</div>
      </div>
      <HomeFooter />
    </>
  );
}

export default HomeLayout;
