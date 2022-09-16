import { BiUserPin } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import { useState } from 'react';
import './sidebar.scss';
const RouteMenu = [
    {
        name: 'Main',
        title: true,
    },
    {
        path: '/',
        name: 'Dashboard 2',
        icon: <TbLayoutDashboard />,
    },
    {
        name: 'Content',
        title: true,
    },
    {
        path: '/3',
        name: 'Dashboard 3',
        icon: <BiUserPin />,
        isParent: true,
        children: [
            {
                path: '/2',
                name: 'Child 1',
                icon: <BiUserPin />,
            },
            {
                path: '/2',
                name: 'Child 2',
                icon: <BiUserPin />,
            },
        ],
    },
    {
        path: '/2',
        name: 'Dashboard 2',
        icon: <TbLayoutDashboard />,
    },
    {
        path: '/2',
        name: 'Dashboard 2',
        icon: <TbLayoutDashboard />,
    },
];

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
    const [resize, setResize] = useState(false);

    const [hoverMenu, setHoverMenu] = useState(false);
    console.log('reee');

    const navLinkActive = ({ isActive }: any) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
        };
    };
    // const handleResize = () => {
    //     let widthScreen = window.matchMedia('(min-width: 991px)').matches;
    //     if (widthScreen) {
    //         setResize(widthScreen);
    //     }
    // };

    // window.addEventListener('resize', handleResize);

    const handleHoverSidebar = () => {
        // FALSE, SIDEBAR 270px
        // TRUE, SIDEBAR 70px

        if (isOpenMenu || hoverMenu) {
            dispatch(toggleMenu());
            setHoverMenu(!hoverMenu);
        }

        // if (hoverMenu && !isOpenMenu) {
        //     dispatch(toggleMenu());
        //     setHoverMenu(false);
        // }
    };

    return (
        <>
            <div className="sidebar">
                <div
                    onMouseEnter={() => handleHoverSidebar()}
                    onMouseLeave={() => handleHoverSidebar()}
                    className={`container sidebar-menu fixed bg-white h-full z-[99] top-0 left-0 bottom-0 shadow-md border-r border-t border-[#e9edf4] tablet:top-[70px] 
                    transition-all duration-500
                    ${isOpenMenu ? 'w-[70px] tablet:w-[0px]' : 'w-[270px] tablet:w-[270px]'}`}
                >
                    <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="sidebar-header justify-center items-center h-[75px] py-[19px] px-[17px] border-b border-right border-[#e9edf4]"
                    >
                        <Link to="/" className="branch-logo font-bold text-center">
                            5Star
                        </Link>
                    </motion.div>
                    <div className="side-main">
                        <div className="side-menu">
                            <ul className="menu-list px-[10px] py-[10px] overflow-auto overflow-x-hidden">
                                {RouteMenu.map((menu: any, index) => (
                                    <div key={index}>
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
                                            <li className="menu-item text-base">
                                                <NavLink
                                                    to={menu.path}
                                                    style={navLinkActive}
                                                    className="menu-item__link flex items-center my-[10px] py-[6px] px-[15px] rounded-md whitespace-nowrap text-secondary hover:bg-slate-400 hover:text-white hover:transition-all"
                                                >
                                                    <span className="icon mr-1 text-xl">{menu.icon}</span>
                                                    {!isOpenMenu && (
                                                        <>
                                                            <AnimatePresence>
                                                                <motion.span
                                                                    variants={showAnimation}
                                                                    initial="hidden"
                                                                    animate="show"
                                                                    exit="hidden"
                                                                    className="flex-auto whitespace-nowrap"
                                                                >
                                                                    {menu.name}
                                                                </motion.span>
                                                            </AnimatePresence>

                                                            {menu.isParent && (
                                                                <span className="text-xl">
                                                                    <RiArrowDropDownLine />
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </NavLink>
                                                {!isOpenMenu && (
                                                    <ul className="menu-children pl-[20px]">
                                                        {menu.children?.map((child: any, index: any) => (
                                                            <NavLink
                                                                key={index}
                                                                to={child.path}
                                                                style={navLinkActive}
                                                                className="menu-item__link flex items-center py-[6px] px-[15px] rounded-md whitespace-nowrap text-secondary hover:bg-slate-400 hover:text-white hover:transition-all"
                                                            >
                                                                <span className="icon mr-1 text-xl">{child.icon}</span>
                                                                <span className="flex-auto whitespace-nowrap">
                                                                    {child.name}
                                                                </span>
                                                            </NavLink>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
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
