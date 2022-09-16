import { useState } from 'react';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

const DefaultLayout = ({ Children }: DefaultLayoutProps) => {
    return (
        <div className="dashboard">
            <Sidebar>
                <Header />
            </Sidebar>
            <main className="main-dashboard bg-black">
                <Children />
            </main>
        </div>
    );
};

export default DefaultLayout;
