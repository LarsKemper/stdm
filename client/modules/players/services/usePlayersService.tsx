import { useState } from 'react';

function usePlayersService() {
  const [loading, setLoading] = useState<boolean>(false);

  async function getPlayers() {
    return;
  }

  async function getPlayer(id: string) {
    return;
  }

  return {
    loading,
    getPlayers,
    getPlayer,
  };
}

export default usePlayersService;
