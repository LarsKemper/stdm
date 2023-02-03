import { createStyles, Container, Group, Anchor } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import StLogo from "@components/StLogo";

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function HomeFooter() {
    const { t } = useTranslation(TranslationScopeEnum.HOME);

    const links: { link: string; label: string }[] = [
        {
            link: '/policy',
            label: t('footer.item-imprint-label'),
        },
    ];

    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor<'a'>
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <StLogo />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}

export default HomeFooter;