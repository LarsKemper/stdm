import React from 'react';
import { IconSearch } from '@tabler/icons';
import { Autocomplete } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

interface StSearchProps {
  onChange: (value: string) => void;
  data: string[];
}

function StSearch(props: StSearchProps) {
  const { t } = useTranslation(TranslationScopeEnum.COMMON);

  return (
    <Autocomplete
      onChange={props.onChange}
      mt="xl"
      placeholder={t('search.placeholder')}
      icon={<IconSearch size="1rem" stroke={1.5} />}
      data={props.data}
    />
  );
}

export default StSearch;
