import { useState } from 'react';
import { routes } from '@enums/ApiEnum';
import { notification } from '@util/notification.service';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import axios from 'axios';
import { usePlayerStore } from '@modules/players/stores/usePlayerStore';
import { Player } from '@stTypes/index';

function usePlayersService() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation(TranslationScopeEnum.PLAYERS);
  const playerStore = usePlayerStore();

  async function getPlayers() {
    setLoading(true);

    await axios
      .get(routes.players())
      .then((res) => {
        playerStore.set({
          players: res.data.players,
          names: res.data.players.map((player: Player) => player.name),
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
    getPlayers,
  };
}

export default usePlayersService;
