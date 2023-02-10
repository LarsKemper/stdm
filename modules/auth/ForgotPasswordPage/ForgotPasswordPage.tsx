import React from 'react';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { forgotPasswordStyles } from './ForgotPasswordPage.styles';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import ClientOnly from '@components/ClientOnly';
import WaitForAuth from '../WaitForAuth';
import StHead from '@components/StHead';

const useStyles = forgotPasswordStyles;

function ForgotPasswordPage() {
  const { t } = useTranslation(TranslationScopeEnum.AUTH);
  const { classes } = useStyles();

  return (
    <ClientOnly>
      <WaitForAuth negate route="/">
        <StHead title={t('forgot-password.page-title')} />
        <div className={classes.container}>
          <Container size={460} my={30}>
            <Title className={classes.title} align="center">
              {t('forgot-password.headline')}
            </Title>
            <Text color="dimmed" size="sm" align="center">
              {t('forgot-password.subline')}
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput
                label={t('forgot-password.email-label')}
                placeholder={t('forgot-password.email-placeholder')}
                required
              />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor color="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <Link href="/auth/login">
                      <Anchor<'a'> size="sm">
                        <IconArrowLeft size={12} stroke={1.5} />
                        {t('forgot-password.go-back-action')}
                      </Anchor>
                    </Link>
                  </Center>
                </Anchor>
                <Button className={classes.control}>
                  {t('forgot-password.button-label')}
                </Button>
              </Group>
            </Paper>
          </Container>
        </div>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default ForgotPasswordPage;
