import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import HomeHeader from "@components/home/HomeHeader";
import StHead from "@components/StHead";

interface HomeLayoutProps {
    children: ReactNode;
    title: string;
    links: { link: string; label: string }[];
}

const HomeFooter = dynamic(() => import('@components/home/HomeFooter'));

function HomeLayout(props: HomeLayoutProps) {
    return (
        <>
            <StHead title={props.title} />
            <div style={{ minHeight: '100vh' }}>
                <HomeHeader links={props.links} />
                <div>{props.children}</div>
            </div>
            <HomeFooter />
        </>
    );
}

export default HomeLayout;