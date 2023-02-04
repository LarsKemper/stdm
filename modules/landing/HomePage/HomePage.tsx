import React from 'react';
import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { homePageStyles } from './HomePage.styles';
import HomeLayout from '@modules/layout/HomeLayout';
import WaitForAuth from '@modules/auth/WaitForAuth';
import ClientOnly from '@components/ClientOnly';

const useStyles = homePageStyles;

function HomePage() {
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  const links: { link: string; label: string }[] = [
    {
      link: '/',
      label: t('header.item-home-label'),
    },
    {
      link: '/app',
      label: t('header.item-app-label'),
    },
  ];

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('general.page-title')} links={links}>
          <Container size={700} className={classes.inner}>
            <h1 className={classes.title}>
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                inherit
              >
                {t('general.headline--highlight-1')}
              </Text>{' '}
              {t('general.headline--no-highlight-1')}{' '}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                inherit
              >
                {t('general.headline--highlight-2')}
              </Text>{' '}
              {t('general.headline--no-highlight-2')}
            </h1>

            <Text className={classes.description} color="dimmed">
              {t('general.desc')}
            </Text>

            <Group mb={200} className={classes.controls}>
              <Link href="/auth/register">
                <Button
                  size="xl"
                  className={classes.control}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                >
                  {t('general.action-button')}
                </Button>
              </Link>

              <Link href="https://github.com/LarsKemper/stdm" target="_blank">
                <Button
                  size="xl"
                  variant="default"
                  className={classes.control}
                  leftIcon={<GithubIcon size={20} />}
                >
                  GitHub
                </Button>
              </Link>
            </Group>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default HomePage;
