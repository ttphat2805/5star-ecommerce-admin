import Header from '~/components/Header';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <div className="dashboard">
            <Header />
            <main className="mt-16">
                <Children />
            </main>
        </div>
    );
}

export default DefaultLayout;
