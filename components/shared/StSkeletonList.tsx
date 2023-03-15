import React, { ReactNode } from 'react';
import { Grid } from '@mantine/core';

interface StSkeletonListProps {
  length: number;
  skeleton: ReactNode;
  span?: number;
}

function StSkeletonList(props: StSkeletonListProps) {
  const items = new Array(props.length).fill({});

  return (
    <>
      {items.map((item, index) => {
        return (
          <Grid.Col span={props.span || 6} key={index}>
            {props.skeleton}
          </Grid.Col>
        );
      })}
    </>
  );
}

export default StSkeletonList;
