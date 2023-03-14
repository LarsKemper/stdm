import { Card, Image, Text, Group, Grid } from '@mantine/core';
import { playerCardStyles } from '@components/players/PlayerCard/PlayerCard.styles';
import { Player } from '@stTypes/index';

interface PlayerCardProps {
  player: Player;
}

const useStyles = playerCardStyles;

function PlayerCard(props: PlayerCardProps) {
  const { classes } = useStyles();

  return (
    <Grid.Col span={6}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          <Image src={props.player.avatarUrl} height={140} width={140} />
          <div className={classes.body}>
            <Text transform="uppercase" color="dimmed" weight={700} size="xs">
              {props.player.number}
            </Text>
            <Text className={classes.title} mt="xs" mb="md">
              {props.player.name}
            </Text>
            <Group noWrap spacing="xs">
              <Text size="xs" color="dimmed">
                {new Date(props.player.birthDate).toLocaleDateString()}
              </Text>
            </Group>
          </div>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export default PlayerCard;
