import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StHead from '@components/StHead';
import { notFoundPageStyles } from './PageNotFound.styles';
import { NotFoundIcon } from '@icons';

const useStyles = notFoundPageStyles;

function NotFoundPage() {
  const { classes } = useStyles();
  const { t } = useTranslation(TranslationScopeEnum.COMMON);

  return (
    <>
      <StHead title={t('not-found.page-title')} />
      <div className={classes.container}>
        <Container className={classes.root}>
          <div className={classes.inner}>
            <NotFoundIcon className={classes.image} />
            <div className={classes.content}>
              <Title className={classes.title}>{t('not-found.headline')}</Title>
              <Text
                color="dimmed"
                size="lg"
                align="center"
                className={classes.description}
              >
                {t('not-found.desc')}
              </Text>
              <Group position="center">
                <Link href="/">
                  <Button size="md">{t('not-found.back-button')}</Button>
                </Link>
              </Group>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default NotFoundPage;
