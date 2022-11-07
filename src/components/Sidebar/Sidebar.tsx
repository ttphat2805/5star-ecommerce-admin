import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import Logo from '../Logo';
import { RouteSidebarMenu } from './routeSidebar';
import './sidebar.scss';
import SidebarItem from './SidebarItem';

const showAnimation = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

const Sidebar = () => {
    const isOpenMenu = useAppSelector(MenuActive);
    const dispatch = useAppDispatch();

    const [hoverMenu, setHoverMenu] = useState(false);

    const handleHoverSidebar = () => {
        // FALSE, SIDEBAR 270px
        // TRUE, SIDEBAR 70px
        if (isOpenMenu || hoverMenu) {
            dispatch(toggleMenu());
            setHoverMenu(!hoverMenu);
        }
    };

    return (
        <>
            <div className="sidebar">
                <div
                    onMouseEnter={() => handleHoverSidebar()}
                    onMouseLeave={() => handleHoverSidebar()}
                    className={`sidebar-menu fixed bg-white h-full z-[99] top-0 left-0 bottom-0 shadow-md border-r border-t border-[#e9edf4] tablet:top-[70px] 
                    transition-all duration-500
                    ${isOpenMenu ? 'w-[70px] tablet:w-[0px]' : 'w-[270px] tablet:w-[270px]'}`}
                >
                    <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="sidebar-header flex tablet:hidden justify-center items-center h-[75px] py-[19px] px-[17px] border-b border-right border-[#e9edf4]"
                    >
                        <Link to="/" className="branch-logo font-bold text-center text-primary">
                            {/* LOGO */}
                            <Logo className="w-3/4 m-auto" />
                        </Link>
                    </motion.div>
                    <div className="side-main h-full">
                        <div className="side-menu h-full">
                            <ul className="menu-list w-full px-[10px] py-[10px] overflow-auto overflow-x-hidden h-full">
                                {RouteSidebarMenu.map((menu: any, index: string | number) => (
                                    <div key={index}>
                                        {/* This is Title. ex: Main */}
                                        {menu.title ? (
                                            <>
                                                {!isOpenMenu && (
                                                    <AnimatePresence>
                                                        <motion.li
                                                            variants={showAnimation}
                                                            initial="hidden"
                                                            animate="show"
                                                            exit="hidden"
                                                            className="category text-base whitespace-nowrap text-primary py-[6px] px-[15px] "
                                                        >
                                                            <h3>{menu.name}</h3>
                                                        </motion.li>
                                                    </AnimatePresence>
                                                )}
                                            </>
                                        ) : (
                                            <SidebarItem
                                                menu={menu}
                                                isOpenMenu={isOpenMenu}
                                                showAnimation={showAnimation}
                                            />
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
