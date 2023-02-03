import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function StColorToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Group position="center" my="xl">
            <ActionIcon
                data-testid="st-color-toggle-action-icon"
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                    color:
                        theme.colorScheme === 'dark'
                            ? theme.colors.yellow[4]
                            : theme.colors.blue[6],
                })}
            >
                {colorScheme === 'dark' ? (
                    <IconSun data-testid="st-icon-sun" size={18} />
                ) : (
                    <IconMoonStars data-testid="st-icon-moon-stars" size={18} />
                )}
            </ActionIcon>
        </Group>
    );
}

export default StColorToggle;