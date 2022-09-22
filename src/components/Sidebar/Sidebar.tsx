import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BiUserPin } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import './sidebar.scss';
import SidebarItem from './SidebarItem';
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
        path: '/2',
        name: 'Dashboard 2',
        icon: <TbLayoutDashboard />,
    },
    {
        name: 'Content',
        title: true,
    },
    {
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
            {
                path: '/2',
                name: 'Child 2',
                icon: <BiUserPin />,
            },
            {
                path: '/2',
                name: 'Child 2',
                icon: <BiUserPin />,
            },
            {
                path: '/2',
                name: 'Child 2',
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
        name: 'Dashboard 2',
        icon: <TbLayoutDashboard />,
        isParent: true,
        children: [
            {
                path: '/21321312',
                name: 'Child 3333',
                icon: <BiUserPin />,
            },
            {
                path: '/232131231',
                name: 'Child 444',
                icon: <BiUserPin />,
            },
        ],
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
                    <div className="side-main h-full">
                        <div className="side-menu h-full">
                            <ul className="menu-list w-full px-[10px] py-[10px] overflow-auto overflow-x-hidden h-full">
                                {RouteMenu.map((menu: any, index) => (
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
