import { useUserStore } from 'stores/useUserStore';
import { useTokenStore } from '@store/useTokenStore';
import { TranslationScopeEnum } from './../../enums/TranslationScopeEnum';
import { RegisterForm, LoginForm } from './../../types/forms';
import { notification } from './../../utils/notification.service';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { routes } from '@enums/ApiEnum';
import useTranslation from 'next-translate/useTranslation';

function useAuthService() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(TranslationScopeEnum.AUTH);
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  async function logout() {
    tokenStore.reset();
    userStore.reset();
    router.replace('/auth/login');
  }

  async function login(form: LoginForm) {
    setLoading(true);

    await axios
      .post(routes.login(), form)
      .then((res) => {
        setLoading(false);
        tokenStore.setToken({
          token: res.data.token,
        });
        userStore.setUser({
          id: res.data.user.id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
        });

        router.push((router.query.next as string) || '/');
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          title: t('login.error-title'),
          message: err.response.data || err.message,
        });
      });
  }

  async function register(form: RegisterForm) {
    setLoading(true);

    await axios
      .post(routes.register(), form)
      .then((res) => {
        setLoading(false);
        tokenStore.setToken({
          token: res.data.token,
        });
        userStore.setUser({
          id: res.data.user.id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
        });
        notification.success({
          title: t('register.success-title'),
          message: t('register.success-message'),
        });

        router.push('/');
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          title: t('register.error-title'),
          message: err.response.data || err.message,
        });
      });
  }

  return {
    login,
    register,
    logout,
    loading,
  };
}

export default useAuthService;
