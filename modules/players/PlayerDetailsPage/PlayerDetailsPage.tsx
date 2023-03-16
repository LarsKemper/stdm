import React, { useContext, useEffect } from 'react';
import ClientOnly, { MountedContext } from '@components/shared/ClientOnly';
import WaitForAuth from '@modules/auth/services/WaitForAuth';
import HomeLayout from '@modules/layout/HomeLayout';
import useTranslation from 'next-translate/useTranslation';
import { TranslationScopeEnum } from '@enums/TranslationScopeEnum';
import { Avatar, Container, Group, Skeleton, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import {
  FactTableType,
  StFactTable,
} from '@components/shared/StFactTable/StFactTable';
import { playerDetailsStyles } from '@modules/players/PlayerDetailsPage/PlayerDetailsPage.styles';
import { usePlayerStore } from '@modules/players/stores/usePlayerStore';
import usePlayersService from '@modules/players/services/usePlayersService';

const useStyles = playerDetailsStyles;

function PlayerDetailsPage() {
  const { t } = useTranslation(TranslationScopeEnum.HOME);
  const { classes } = useStyles();
  const playerStore = usePlayerStore();
  const { loading, getPlayers } = usePlayersService();
  const { mounted } = useContext(MountedContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.playerId) {
      return router.back();
    }

    getPlayers(router.query.playerId as string).catch();
  }, [mounted, router]);

  return (
    <ClientOnly>
      <WaitForAuth>
        <HomeLayout title={t('player-details.page-title')}>
          <Container>
            <Group mb="xl">
              {!loading && playerStore.player && playerStore.player.country ? (
                <>
                  <Avatar
                    src={playerStore.player.avatarUrl}
                    alt={playerStore.player.avatarUrl}
                    size="xl"
                    radius="xl"
                  />
                  <div>
                    <Text className={classes.teamName}>
                      {playerStore.player.name}
                    </Text>
                    <Text className={classes.stadium} c="dimmed">
                      {playerStore.player.country.name}
                    </Text>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton width={84} height={84} radius="xl" />
                  <div>
                    <Skeleton width={170} height={28} />
                    <Skeleton mt="xs" width={150} height={25} />
                  </div>
                </>
              )}
            </Group>
            <Group mb="xl">
              <StFactTable
                loading={loading}
                facts={[
                  {
                    label: t('player-details.facts.birthday'),
                    value: new Date(
                      playerStore.player?.birthDate || ''
                    ).toLocaleDateString(),
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('player-details.facts.country'),
                    value: playerStore.player?.country?.name,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('player-details.facts.position'),
                    value: playerStore.player?.position,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('player-details.facts.number'),
                    value: playerStore.player?.number.toString(),
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('player-details.facts.height'),
                    value: `${playerStore.player?.height} cm`,
                    type: FactTableType.TEXT,
                  },
                  {
                    label: t('player-details.facts.weight'),
                    value: `${playerStore.player?.weight} kg`,
                    type: FactTableType.TEXT,
                  },
                ]}
              />
            </Group>
          </Container>
        </HomeLayout>
      </WaitForAuth>
    </ClientOnly>
  );
}

export default PlayerDetailsPage;
