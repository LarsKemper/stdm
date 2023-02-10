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
import { registerPageStyles } from './RegisterPage.styles';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { useForm } from '@mantine/form';
import { validator } from '@util/validator.service';
import StHead from '@components/StHead';
import { RegisterForm } from '@stTypes/forms';
import useAuthService from '../useAuthService';
import ClientOnly from '@components/ClientOnly';
import WaitForAuth from '../WaitForAuth';

const useStyles = registerPageStyles;

function RegisterPage() {
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.AUTH);
  const { register, loading } = useAuthService();

  const form = useForm<RegisterForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: {
      email: validator.email,
      firstName: validator.name,
      lastName: validator.name,
      password: validator.password,
    },
  });

  return (
    <ClientOnly>
      <WaitForAuth route="/" negate>
        <StHead title={t('register.page-title')} />
        <div className={classes.container}>
          <Container size={420} my={40}>
            <form onSubmit={form.onSubmit(register)}>
              <Title
                align="center"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}
              >
                {t('register.headline')}
              </Title>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                {t('register.account-action-discaimer')}{' '}
                <Link href="/auth/login">
                  <Anchor<'a'> href="#" size="sm">
                    {t('register.account-action-name')}
                  </Anchor>
                </Link>
              </Text>
              <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                  label={t('register.firstName-label')}
                  placeholder={t('register.firstName-placeholder')}
                  required
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  label={t('register.lastName-label')}
                  mt="md"
                  placeholder={t('register.lastName-placeholder')}
                  required
                  {...form.getInputProps('lastName')}
                />
                <TextInput
                  label={t('register.email-label')}
                  mt="md"
                  placeholder={t('register.email-placeholder')}
                  required
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  label={t('register.password-label')}
                  placeholder={t('register.password-placeholder')}
                  required
                  mt="md"
                  {...form.getInputProps('password')}
                />
                <Group position="apart" mt="lg">
                  <Checkbox
                    label={t('register.remember-me-label')}
                    sx={{ lineHeight: 1 }}
                  />
                  <Link href="/auth/forgot-password">
                    <Anchor<'a'> size="sm">
                      {t('register.forgot-password-action')}
                    </Anchor>
                  </Link>
                </Group>
                <Button loading={loading} type="submit" fullWidth mt="xl">
                  {t('register.button-label')}
                </Button>
              </Paper>
            </form>
          </Container>
        </div>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default RegisterPage;
