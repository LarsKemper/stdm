import { showNotification } from '@mantine/notifications';
import { MantineNumberSize } from '@mantine/core';

interface Notification {
  title: string;
  message: string;
}

const stNotificationStyle: {
  radius: MantineNumberSize;
  autoClose: boolean;
} = {
  radius: 'md',
  autoClose: true,
};

export const notification = {
  error: (props: Notification) => {
    showNotification({
      ...stNotificationStyle,
      title: props.title,
      message: props.message,
      color: 'red',
    });
  },
  success: (props: Notification) => {
    showNotification({
      ...stNotificationStyle,
      title: props.title,
      message: props.message,
      color: 'green',
    });
  },
};
