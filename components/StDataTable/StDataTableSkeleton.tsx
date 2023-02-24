import React from 'react';
import { Table, Skeleton } from '@mantine/core';

function StDataTableSkeleton() {
  const list = new Array(9).fill({});

  const rows = list.map((element, index) => (
    <tr key={index}>
      <td>
        <Skeleton width={75} height={22} />
      </td>
      <td>
        <Skeleton width={75} height={22} />
      </td>
      <td>
        <Skeleton width={75} height={22} />
      </td>
      <td>
        <Skeleton width={75} height={22} />
      </td>
    </tr>
  ));

  return (
    <Table mt="md">
      <thead>
        <tr>
          <th>
            <Skeleton width={150} height={22} />
          </th>
          <th>
            <Skeleton width={150} height={22} />
          </th>
          <th>
            <Skeleton width={150} height={22} />
          </th>
          <th>
            <Skeleton width={150} height={22} />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default StDataTableSkeleton;
