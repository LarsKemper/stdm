import React from 'react';
import StDataTable from '@components/shared/StDataTable/StDataTable';
import useTablesService from '@modules/landing/services/useTablesService';

function LeagueTable() {
  const { loading } = useTablesService();

  return (
    <StDataTable head={<th></th>} body={<tbody></tbody>} loading={loading} />
  );
}

export default LeagueTable;
