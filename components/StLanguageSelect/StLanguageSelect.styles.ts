import { createStyles } from '@mantine/core';
import { StLanguageSelectProps } from "@components/StLanguageSelect/StLanguageSelect";

export const stLanguageSelectStyles = createStyles(
    (
        theme,
        { opened, props }: { opened: boolean; props: StLanguageSelectProps }
    ) => ({
        control: {
            width: props.fullWidth ? '100%' : props.small ? 55 : 200,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: props.small ? '5px 5px' : '10px 15px',
            borderRadius: theme.radius.md,
            border: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[2]
            }`,
            transition: 'background-color 150ms ease',
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[opened ? 5 : 6]
                    : opened
                        ? theme.colors.gray[0]
                        : theme.white,

            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[5]
                        : theme.colors.gray[0],
            },
        },

        label: {
            fontWeight: 500,
            fontSize: theme.fontSizes.sm,
        },

        icon: {
            transition: 'transform 150ms ease',
            transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
        },
    })
);