import { ReactNode } from 'react';

interface StListProps {
  listLength: number;
  loading: boolean;
  skeletonList: ReactNode;
  emptyCard: ReactNode;
  children: ReactNode;
}

function StListLoader(props: StListProps) {
  if (props.loading) {
    return <>{props.skeletonList}</>;
  }

  if (props.listLength <= 0) {
    return <>{props.emptyCard}</>;
  }

  return <>{props.children}</>;
}

export default StListLoader;
