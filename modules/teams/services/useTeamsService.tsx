import { useState } from 'react';
import { routes } from '@enums/ApiEnum';
import { notification } from '@util/notification.service';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import axios from 'axios';
import { useTeamStore } from '@modules/teams/stores/useTeamStore';
import { Team } from '@stTypes/index';

function useTeamsService() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const teamStore = useTeamStore();

  async function getTeams(id?: string) {
    setLoading(true);

    await axios
      .get(routes.teams(id))
      .then((res) => {
        teamStore.set(
          id
            ? {
                team: res.data.team,
              }
            : {
                teams: res.data.teams,
                names: res.data.teams.map((team: Team) => team.club?.name),
              }
        );

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
    getTeams,
  };
}

export default useTeamsService;
