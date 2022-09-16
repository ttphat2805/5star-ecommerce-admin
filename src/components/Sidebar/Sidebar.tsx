import { Children } from 'react';
import { BiUserPin } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
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

const Sidebar = ({ Children }: any) => {
    const navLinkActive = ({ isActive }: any) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
        };
    };

    return (
        <>
            <div className="sidebar">
                <div className="container fixed bg-white w-[270px] h-full z-[99] top-0 left-0 bottom-0 shadow-md border-r border-[#e9edf4]">
                    <div className="sidebar-header center items-center h-[75px] py-[19px] px-[17px] border-b border-right border-[#e9edf4]">
                        <Link to="/" className="branch-logo font-bold text-center">
                            5Star
                        </Link>
                    </div>
                    <div className="side-main">
                        <div className="side-menu">
                            <ul className="menu-list px-[10px] py-[10px]">
                                {RouteMenu.map((menu: any, index) => (
                                    <div key={index}>
                                        {menu.title ? (
                                            <li className="category text-base whitespace-nowrap text-primary my-[10px] px-[10px]">
                                                <h3>{menu.name}</h3>
                                            </li>
                                        ) : (
                                            <li className="menu-item text-base">
                                                <NavLink
                                                    to={menu.path}
                                                    style={navLinkActive}
                                                    className="menu-item__link flex items-center py-[6px] px-[15px] rounded-md whitespace-nowrap text-secondary hover:bg-slate-400 hover:text-white hover:transition-all"
                                                >
                                                    <span className="icon mr-1 text-xl">{menu.icon}</span>
                                                    <span className="flex-auto whitespace-nowrap">{menu.name}</span>
                                                    {menu.isParent && (
                                                        <span className="text-xl">
                                                            <RiArrowDropDownLine />
                                                        </span>
                                                    )}
                                                </NavLink>
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
                                            </li>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {Children}
        </>
    );
};

export default Sidebar;
