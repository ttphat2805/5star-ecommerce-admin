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
        <div className="dashboard overflow-x-hidden">
            <Sidebar />
            <Header />

            <main
                className={`main-dashboard py-[20px] pt-[90px] tablet:pl-[10px] transition-all px-[30px] bg-[#f7f8f9] ${
                    !isOpenMenu ? 'pl-[295px]' : 'pl-[95px]'
                }`}
            >
                <Children />
            </main>
        </div>
    );
};

export default DefaultLayout;
