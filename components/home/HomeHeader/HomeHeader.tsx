import { useState } from 'react';
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import StColorToggle from '@components/StColorToggle';
import StLanguageSelect from '@components/StLanguageSelect/StLanguageSelect';
import StLogo from '@components/StLogo';
import { homeHeaderStyles, HEADER_HEIGHT } from './HomeHeader.styles';
import useAuthService from '@modules/auth/useAuthService';
import { IconLogout } from '@tabler/icons';

const useStyles = homeHeaderStyles;

export interface HeaderProps {
  links: { link: string; label: string }[];
  showColorToggle?: boolean;
}

function HomeHeader({ links }: HeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { logout } = useAuthService();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <StLogo />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <div className={classes.toolbox}>
          <ActionIcon
            size="lg"
            onClick={() => logout()}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.red[4]
                  : theme.colors.red[6],
            })}
          >
            <IconLogout size={18} />
          </ActionIcon>

          <StColorToggle />
          <StLanguageSelect small />
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

export default HomeHeader;
