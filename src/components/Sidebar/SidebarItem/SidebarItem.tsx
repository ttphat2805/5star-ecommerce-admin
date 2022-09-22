import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
const menuItemAnimation = {
    hidden: (index: any) => ({
        x: '-100%',
        transition: {
            duration: (index + 1) * 0.2,
        },
    }),
    show: (index: any) => ({
        x: 0,
        transition: {
            duration: (index + 1) * 0.2,
        },
    }),
};
const menuAnimation = {
    hidden: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.3, when: 'afterChildren' },
    },
    show: {
        opacity: 1,
        height: 'fit-content',
        transition: {
            duration: 0.3,
            when: 'beforeChildren',
        },
    },
};
const SidebarItem = ({ menu, isOpenMenu, showAnimation }: any) => {
    const [activeSubMenu, setActiveSubMenu] = useState(false);

    const navLinkActive = ({ isActive }: any) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
        };
    };

    const handleActiveSubMenu = () => {
        setActiveSubMenu(!activeSubMenu);
    };
    return (
        <>
            <li className="menu-item text-base">
                <NavLink
                    to={menu.path || '#'}
                    style={navLinkActive}
                    onClick={handleActiveSubMenu}
                    className="menu-item__link flex items-center my-[10px] py-[6px] px-[15px] rounded-md whitespace-nowrap text-secondary hover:bg-slate-400 hover:text-white hover:transition-all"
                >
                    <span className="icon mr-1 text-xl">{menu.icon}</span>
                    {/* isOpenMenu is a variable that when the menu closes, the item will be hidden */}
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
                                // icon dropdown menu
                                <motion.span
                                    className="text-3xl"
                                    animate={
                                        activeSubMenu
                                            ? {
                                                  rotate: -90,
                                              }
                                            : { rotate: 0 }
                                    }
                                >
                                    <RiArrowDropDownLine />
                                </motion.span>
                            )}
                        </>
                    )}
                </NavLink>
                {/* isOpenMenu is a variable that when the menu closes, the item will be hidden */}

                {/* This is SubMenu - Menu Child */}
                {!isOpenMenu && activeSubMenu ? (
                    <AnimatePresence>
                        <motion.ul
                            variants={menuAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="menu-children pl-[20px]"
                        >
                            {menu.children?.map((child: any, index: any) => (
                                <motion.div variants={menuItemAnimation} key={index} custom={index}>
                                    <NavLink
                                        to={child.path || '#'}
                                        style={navLinkActive}
                                        className="submenu-item__link flex items-center py-[6px] px-[15px] rounded-md whitespace-nowrap text-secondary hover:bg-slate-400 hover:text-white hover:transition-all"
                                    >
                                        <span className="icon mr-1 text-xl">{child.icon}</span>
                                        <span className="flex-auto whitespace-nowrap">{child.name}</span>
                                    </NavLink>
                                </motion.div>
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                ) : null}
            </li>
        </>
    );
};

export default SidebarItem;
