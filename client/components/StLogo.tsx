import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    name: {
        margin: 0,
        lineHeight: 1,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontWeight: 800,
    },
}));

function StLogo() {
    const { classes } = useStyles();

    return <h2 className={classes.name}>STDM</h2>;
}

export default StLogo;