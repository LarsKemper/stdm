import React from 'react';
import Head from 'next/head';

interface Props {
    title: string;
    desc?: string;
}

function StHead(props: Props) {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <title>{`${props.title} - STDM`}</title>
            <meta name="description" content={props.desc} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.5, maximum-scale=1.5, user-scalable=no"
                key="viewport"
            />
            <link
                href="/assets/template/favicon.ico"
                rel="icon"
                type="image/x-icon"
            />
        </Head>
    );
}

export default StHead;