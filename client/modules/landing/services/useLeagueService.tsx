import { useState } from 'react';
import axios from 'axios';
import { routes } from '@enums/ApiEnum';
import { notification } from '@util/notification.service';
import { useTableStore } from '@modules/landing/stores/useTableStore';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';

function useLeagueService() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const tableStore = useTableStore();

  async function getLeagues() {
    setLoading(true);

    await axios
      .get(routes.leagues())
      .then(async (res) => {
        tableStore.set({
          leagues: res.data.leagues,
        });

        if (res.data.leagues.at(0).id) {
          await getTable(res.data.leagues.at(0).id);
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          title: t('fetch-error-title'),
          message: err.response?.data || err.message,
        });
      });
  }

  async function getTable(leagueId: string) {
    if (tableStore.selectedId === leagueId) {
      return;
    }

    setLoading(true);

    await axios
      .get(routes.views(`table/${leagueId}`))
      .then((res) => {
        tableStore.set({
          selectedId: leagueId,
          table: res.data.table,
        });

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          title: t('fetch-error-title'),
          message: err.response?.data || err.message,
        });
      });
  }

  return {
    loading,
    getLeagues,
    getTable,
  };
}

export default useLeagueService;
