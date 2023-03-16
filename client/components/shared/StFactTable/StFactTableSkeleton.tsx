import React from 'react';
import { ScrollArea, Skeleton, Table } from '@mantine/core';

function StFactTableSkeleton() {
  return (
    <ScrollArea sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
          <tr>
            <td>
              <Skeleton width={100} height={25} />
            </td>
            <td>
              <Skeleton width={100} height={25} />
            </td>
          </tr>
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default StFactTableSkeleton;
