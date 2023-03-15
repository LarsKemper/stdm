import { Card, Image, Text, Group, Grid } from '@mantine/core';
import { stCardStyles } from '@components/shared/StCard/StCard.styles';
import Link from 'next/link';

interface CardProps {
  id: string;
  image: string;
  topLine: string | number;
  title: string;
  date?: Date;
  bottomLine?: string;
  imageSize?: number;
  imageMargin?: number;
}

const useStyles = stCardStyles;

function StCard(props: CardProps) {
  const { classes } = useStyles();

  return (
    <Grid.Col span={6}>
      <Link href={`/teams/${props.id}`} passHref legacyBehavior>
        <Card withBorder radius="md" p={0} className={classes.card}>
          <Group noWrap spacing={0}>
            <Image
              className={classes.image}
              alt={props.title}
              src={props.image}
              height={props.imageSize || 140}
              width={props.imageSize || 140}
              {...(props.imageMargin && { ml: props.imageMargin })}
            />
            <div className={classes.body}>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {props.topLine}
              </Text>
              <Text className={classes.title} mt="xs" mb="md">
                {props.title}
              </Text>
              <Group noWrap spacing="xs">
                {props.date && (
                  <Text size="xs" color="dimmed">
                    {new Date(props.date).toLocaleDateString()}
                  </Text>
                )}
                {props.bottomLine && (
                  <Text size="xs" color="dimmed">
                    {props.bottomLine}
                  </Text>
                )}
              </Group>
            </div>
          </Group>
        </Card>
      </Link>
    </Grid.Col>
  );
}

export default StCard;
