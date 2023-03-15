import React, { ReactNode } from 'react';
import { Table } from '@mantine/core';
import StDataTableSkeleton from '@components/shared/StDataTable/StDataTableSkeleton';
import StEmptyList from '@components/shared/StEmptyList/StEmptyList';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

interface StDataTableProps {
  columns: ReactNode;
  rows: ReactNode | null;
  rowLength: number;
  loading: boolean;
}

function StDataTable(props: StDataTableProps) {
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  if (props.loading) {
    return <StDataTableSkeleton />;
  }

  if (props.rowLength <= 0 || !props.rows) {
    return (
      <StEmptyList
        title={'No results were found...'}
        subTitle={
          'At the moment no result or table is available for this league'
        }
      />
    );
  }

  return (
    <Table horizontalSpacing="md" verticalSpacing="md" fontSize="md">
      <thead style={{ width: '100%' }}>{props.columns}</thead>
      <tbody style={{ width: '100%' }}>{props.rows}</tbody>
    </Table>
  );
}

export default StDataTable;
