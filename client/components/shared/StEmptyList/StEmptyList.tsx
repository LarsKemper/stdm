import { Text, Title, Button } from '@mantine/core';
import { stEmptyListStyles } from '@components/shared/StEmptyList/StEmptyList.styles';

const useStyles = stEmptyListStyles;

interface StEmptyListProps {
  title: string;
  subTitle: string;
  description?: string;
  buttonLabel?: string;
  action?: () => void;
}

function StEmptyList(props: StEmptyListProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title data-testid="ci-empty-list-title" className={classes.title}>
          {props.title}
        </Title>
        <Text
          data-testid="ci-empty-list-subTitle"
          weight={500}
          size="md"
          {...((props.description || (props.action && props.buttonLabel)) && {
            mb: 5,
          })}
        >
          {props.subTitle}
        </Text>
        {props.description && (
          <Text
            data-testid="ci-empty-list-description"
            size="sm"
            color="dimmed"
          >
            {props.description}
          </Text>
        )}
        {props.action && props.buttonLabel ? (
          <div className={classes.controls}>
            <Button
              data-testid="ci-empty-list-action-button"
              onClick={props.action}
            >
              {props.buttonLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default StEmptyList;
