import React, { ReactNode } from 'react';
import { Table } from '@mantine/core';
import StDataTableSkeleton from '@components/shared/StDataTable/StDataTableSkeleton';

export type DataTableItem = {};

interface StDataTableProps {
  head: ReactNode;
  body: ReactNode | null;
  loading: boolean;
}

function StDataTable(props: StDataTableProps) {
  if (props.loading || !props.body) {
    return <StDataTableSkeleton />;
  }

  return (
    <Table horizontalSpacing="md" verticalSpacing="md" fontSize="md">
      <thead>{props.head}</thead>
      <body>{props.body}</body>
    </Table>
  );
}

export default StDataTable;
