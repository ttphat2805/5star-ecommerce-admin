import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import './SidebarItem.scss';
const menuAnimation = {
    hidden: {
        opacity: 0,
        height: 0,
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 7,
        },
    },
    show: {
        opacity: 1,
        height: 'auto',
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 7,
        },
    },
};
const menuItemAnimation = {
    hidden: (index: any) => ({
        x: '-200%',
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
const SidebarItem = ({ menu, isOpenMenu, showAnimation }: any) => {
    const [activeSubMenu, setActiveSubMenu] = useState(false);

    const handleActiveSubMenu = (event: any) => {
        // event.currentTarget.classList.toggle('active');
        setActiveSubMenu(!activeSubMenu);
    };
    return (
        <>
            {menu.isParent ? (
                <li className="sidebar-item menu-item text-base">
                    <NavLink
                        to={menu.path || '#'}
                        onClick={(e) => {
                            handleActiveSubMenu(e);
                            e.preventDefault();
                        }}
                        className="menu-item__link select-none cursor-pointer flex items-center my-[10px] py-[6px] px-[15px] 
                    rounded-md whitespace-nowrap text-tbase hover:bg-hover hover:text-primary hover:transition-all"
                    >
                        <span className={`icon mr-1 text-xl ${menu.color}`}>{menu.icon}</span>
                        {/* isOpenMenu is a variable that when the menu closes, the item will be hidden */}
                        {!isOpenMenu && (
                            <>
                                <AnimatePresence>
                                    <motion.span
                                        variants={showAnimation}
                                        whileTap={{ scale: 0.95 }}
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
                                        className="text-2xl"
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
                    <AnimatePresence>
                        {!isOpenMenu && activeSubMenu ? (
                            <AnimatePresence>
                                <motion.ul
                                    variants={menuAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="menu-children pl-[20px]"
                                >
                                    {menu.children?.map((child: any, index: any) => (
                                        <motion.div
                                            variants={menuItemAnimation}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            custom={index}
                                            animate="show"
                                            exit="exit"
                                        >
                                            <NavLink
                                                to={child.path || '#'}
                                                className="submenu-item__link flex items-center py-[6px] px-[15px] rounded-md 
                                            whitespace-nowrap text-tbase hover:bg-hover hover:text-primary hover:transition-all
                                            "
                                            >
                                                <span className={`icon mr-1 text-xl `}>{child.icon}</span>
                                                <span className="flex-auto whitespace-nowrap">{child.name}</span>
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </motion.ul>
                            </AnimatePresence>
                        ) : null}
                    </AnimatePresence>
                </li>
            ) : (
                <li className="menu-item text-base w-full">
                    <NavLink
                        to={menu.path || '#'}
                        className="menu-item__link w-full flex items-center my-[10px] py-[6px] px-[15px]
                    rounded-md whitespace-nowrap text-tbase hover:bg-hover hover:text-primary hover:transition-all"
                    >
                        <span className="icon mr-1 text-xl">{menu.icon}</span>
                        {/* isOpenMenu is a variable that when the menu closes, the item will be hidden */}
                        {!isOpenMenu && (
                            <>
                                <AnimatePresence>
                                    <motion.span
                                        variants={showAnimation}
                                        whileTap={{ scale: 0.95 }}
                                        animate="show"
                                        exit="hidden"
                                        className="flex-auto whitespace-nowrap"
                                    >
                                        {menu.name}
                                    </motion.span>
                                </AnimatePresence>
                            </>
                        )}
                    </NavLink>
                </li>
            )}
        </>
    );
};

export default SidebarItem;
