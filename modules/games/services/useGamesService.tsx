import { useState } from 'react';
import { routes } from '@enums/ApiEnum';
import { notification } from '@util/notification.service';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import axios from 'axios';
import { useTeamStore } from '@modules/teams/stores/useTeamStore';
import { Team } from '@stTypes/index';
import { useGameStore } from '@modules/games/stores/useGameStore';

function useGamesService() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const gameStore = useGameStore();

  async function getGame(id?: string) {
    setLoading(true);

    await axios
      .get(routes.views(`game/${id}`))
      .then((res) => {
        gameStore.set({
          game: res.data.games,
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

  async function getGames(teamId: string) {
    setLoading(true);

    await axios
      .get(routes.views(`games/${teamId}`))
      .then((res) => {
        gameStore.set({
          games: res.data.games,
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

  async function getEvents(gameId: string) {
    setLoading(true);

    await axios
      .get(routes.views(`game-events/${gameId}`))
      .then((res) => {
        console.log(res);
        gameStore.set({
          events: res.data.events,
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
    getGames,
    getGame,
    getEvents,
  };
}

export default useGamesService;
