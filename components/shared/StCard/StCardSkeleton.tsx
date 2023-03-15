import { Card, Text, Group, Skeleton } from '@mantine/core';
import { stCardStyles } from '@components/shared/StCard/StCard.styles';

const useStyles = stCardStyles;

function PlayerCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Skeleton className={classes.image} width={140} height={140} />
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            <Skeleton height={19} width={40} />
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            <Skeleton height={25} width={100} />
          </Text>
          <Group noWrap spacing="xs">
            <Text size="xs" color="dimmed">
              <Skeleton height={18} width={60} />
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default PlayerCard;
