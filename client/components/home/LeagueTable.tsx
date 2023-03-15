import React from 'react';
import StDataTable from '@components/shared/StDataTable/StDataTable';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

interface LeagueTableProps {
  leagueLoading: boolean;
  positions: LeagueTablePosition[];
}

export type LeagueTablePosition = {
  leagueId: string;
  leagueName: string;
  teamId: string;
  teamName: string;
  clubName: string;
  goalsShot: number;
  goalsGot: number;
  points: number;
  season: string;
};

function LeagueTable(props: LeagueTableProps) {
  const { t } = useTranslation(TranslationScopeEnum.HOME);

  const rows = props.positions.map((position, index) => (
    <tr key={position.clubName}>
      <td>{index}</td>
      <td>{position.teamName}</td>
      <td>{position.clubName}</td>
      <td>{position.season}</td>
      <td>{position.goalsShot}</td>
      <td>{position.goalsGot}</td>
      <td>{position.points}</td>
    </tr>
  ));

  return (
    <StDataTable
      columns={
        <tr>
          <th>{t('tables.table.position')}</th>
          <th>{t('tables.table.team')}</th>
          <th>{t('tables.table.club')}</th>
          <th>{t('tables.table.season')}</th>
          <th>{t('tables.table.goals-shot')}</th>
          <th>{t('tables.table.goals-got')}</th>
          <th>{t('tables.table.points')}</th>
        </tr>
      }
      rows={rows}
      rowLength={props.positions.length}
      loading={props.leagueLoading}
    />
  );
}

export default LeagueTable;
