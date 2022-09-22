import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import { RiDashboardLine } from 'react-icons/ri';

const Header = () => {
    const dispatch = useAppDispatch();
    const isOpenMenu = useAppSelector(MenuActive);

    const toggleMenuActive = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className="header">
            <div
                className={`bg-[#fff] header-container  shadow-md border-b border-[#e9edf4] z-[1] h-[75px]  tablet:shadow-none tablet:pl-[10px] transition-all ${
                    !isOpenMenu ? 'pl-[280px]' : 'pl-[80px]'
                }`}
            >
                <div className="container flex justify-between h-full items-center mr-[16px]">
                    <div className="btn-toggle-menu">
                        <button
                            className="cursor-pointer relative hover:opacity-70 before:block before:absolute before:left-[-10px] 
                        before:w-[20px] before:h-[23px] before:bg-transparent"
                            onClick={() => toggleMenuActive()}
                        >
                            {isOpenMenu ? <HiMenuAlt2 /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                    <div className="header-right mr-[20px]">
                        <ul className="nav-list flex gap-[24px] items-center text-2xl text-tbase">
                            <li className="cursor-pointer rounded-full">
                                <div className="search">
                                    <BsSearch />
                                </div>
                            </li>
                            <li className="cursor-pointer rounded-full">
                                <div className="search">
                                    <RiDashboardLine />
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div className="icon relative">
                                    <IoMdNotificationsOutline />
                                    <span className="badge absolute w-[16px] h-[16px] top-[-5px] right-[-5px] text-[10px] bg-red-500 text-white rounded-full text-center leading-[16px]">
                                        9
                                    </span>
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div className="avatar w-9 h-9">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src="https://pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/assets/img/avatars/1.png"
                                        alt=""
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
