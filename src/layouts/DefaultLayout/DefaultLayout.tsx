import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

const DefaultLayout = ({ Children }: DefaultLayoutProps) => {
    return (
        <div className="dashboard">
            <Sidebar />
            <Header />

            <main className="main-dashboard bg-black">
                <Children />
            </main>
        </div>
    );
};

export default DefaultLayout;
