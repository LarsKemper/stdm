import React, { ReactNode, useEffect } from 'react';
import { useVerifyLoggedIn } from './useVerifyLoggedIn';
import { useRouter } from 'next/router';
import StFullScreenLoader from '@components/shared/StFullScreenLoader';

interface WaitForAuthProps {
  children: ReactNode;
  negate?: boolean;
  route?: string;
}

function WaitForAuth(props: WaitForAuthProps) {
  const { hasToken, hasUser } = useVerifyLoggedIn();
  const { replace, asPath } = useRouter();
  const redirect = props.negate ? hasToken && hasUser : !hasToken || !hasUser;

  useEffect(() => {
    if (redirect) {
      replace(props.route || `/auth/login?next=${asPath}`);
    }
  }, [redirect, asPath, replace, props.route]);

  if (redirect) {
    return <StFullScreenLoader />;
  }

  return <div>{props.children}</div>;
}

export default WaitForAuth;
