import { useAppSelector } from '~/app/hooks';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import { MenuActive } from '~/features/SidebarActive/MenuSlice';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

const DefaultLayout = ({ Children }: DefaultLayoutProps) => {
    const isOpenMenu = useAppSelector(MenuActive);

    return (
        <div className="dashboard">
            <Sidebar />
            <Header />

            <main
                className={`main-dashboard mt-[20px] tablet:pl-[10px] transition-all ${
                    !isOpenMenu ? 'pl-[280px]' : 'pl-[80px]'
                }`}
            >
                <p>MAIN</p>
                <Children />
            </main>
        </div>
    );
};

export default DefaultLayout;
