import { useState } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { stLanguageSelectStyles } from './StLanguageSelect.styles';

export const useStyles = stLanguageSelectStyles;

export interface StLanguageSelectProps {
  fullWidth?: boolean;
  small?: boolean;
}

const data = [
  { label: 'English', locale: 'en', image: '/assets/img/english.png' },
  { label: 'German', locale: 'de', image: '/assets/img/german.png' },
];

type Data = {
  label: string;
  locale: string;
  image: string;
};

function StLanguageSelect(props: StLanguageSelectProps) {
  const { lang } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<Data>(getDefault());
  const { classes } = useStyles({ opened, props });
  const router = useRouter();

  function getDefault(): Data {
    let d = data[0];

    data.forEach((item) => {
      if (item.locale === lang) {
        d = item;
      }
    });

    return d;
  }

  const items = data.map((item) => (
    <Link
      style={{ textDecoration: 'none' }}
      href={router.asPath}
      key={item.label}
      locale={item.locale}
    >
      <Menu.Item
        {...(item.locale === lang && { defaultChecked: true })}
        icon={
          <Image alt={item.label} src={item.image} width={18} height={18} />
        }
        onClick={() => setSelected(item)}
      >
        <div data-testid="st-language-select-menu-item">
          {!props.small && item.label}
        </div>
      </Menu.Item>
    </Link>
  ));

  function handleOpen() {
    setOpened(true);
  }

  function handleClose() {
    setOpened(false);
  }

  return (
    <Menu onOpen={handleOpen} onClose={handleClose} radius="md" width="target">
      <Menu.Target>
        <UnstyledButton
          data-testid="st-select-language-dropdown-button"
          className={classes.control}
        >
          <Group spacing="xs">
            <Image
              alt={selected.label}
              src={selected.image}
              width={22}
              height={22}
            />
            {!props.small && (
              <span data-testid="st-select-language" className={classes.label}>
                {selected.label}
              </span>
            )}
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown data-testid="st-select-language-menu-dropdown">
        {items}
      </Menu.Dropdown>
    </Menu>
  );
}

export default StLanguageSelect;
