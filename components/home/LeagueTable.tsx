import React from 'react';
import StDataTable from '@components/shared/StDataTable/StDataTable';

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
          <th>Position</th>
          <th>Team</th>
          <th>Club</th>
          <th>Season</th>
          <th>Goals shot</th>
          <th>Goals got</th>
          <th>Points</th>
        </tr>
      }
      rows={rows}
      rowLength={props.positions.length}
      loading={props.leagueLoading}
    />
  );
}

export default LeagueTable;
