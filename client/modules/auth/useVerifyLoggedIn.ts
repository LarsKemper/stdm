import { useUserStore } from './../../stores/useUserStore';
import { useTokenStore } from '@store/useTokenStore';

export const useVerifyLoggedIn = () => {
  const hasToken = useTokenStore((x) => !!x.token);
  const hasUser = useUserStore((x) => !!x.id);

  return {
    hasToken,
    hasUser,
  };
};
