import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { loginPageStyles } from './LoginPage.styles';
import StHead from '@components/shared/StHead';
import useAuthService from '../services/useAuthService';
import { useForm } from '@mantine/form';
import { LoginForm } from '@stTypes/forms';
import { validator } from '@util/validator.service';
import ClientOnly from '@components/shared/ClientOnly';
import WaitForAuth from '../services/WaitForAuth';

const useStyles = loginPageStyles;

function LoginPage() {
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.AUTH);
  const { login, loading } = useAuthService();

  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: validator.email,
      password: validator.password,
    },
  });

  return (
    <ClientOnly>
      <WaitForAuth route="/" negate>
        <StHead title={t('login.page-title')} />
        <div className={classes.container}>
          <Container size={420} my={40}>
            <form onSubmit={form.onSubmit(login)}>
              <Title
                align="center"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}
              >
                {t('login.headline')}
              </Title>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                {t('login.account-action-discaimer')}{' '}
                <Link href="/auth/register">
                  <Anchor<'a'> href="#" size="sm">
                    {t('login.account-action-name')}
                  </Anchor>
                </Link>
              </Text>
              <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                  label={t('login.email-label')}
                  placeholder={t('login.email-placeholder')}
                  required
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  label={t('login.password-label')}
                  placeholder={t('login.password-placeholder')}
                  required
                  mt="md"
                  {...form.getInputProps('password')}
                />
                <Group position="apart" mt="lg">
                  <Checkbox
                    label={t('login.remember-me-label')}
                    sx={{ lineHeight: 1 }}
                  />
                  <Link href="/auth/forgot-password">
                    <Anchor<'a'> size="sm">
                      {t('login.forgot-password-action')}
                    </Anchor>
                  </Link>
                </Group>
                <Button loading={loading} type="submit" fullWidth mt="xl">
                  {t('login.button-label')}
                </Button>
              </Paper>
            </form>
          </Container>
        </div>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default LoginPage;
