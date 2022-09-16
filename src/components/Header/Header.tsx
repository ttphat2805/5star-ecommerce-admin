import React from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { motion } from 'framer-motion';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
const Header = () => {
    const dispatch = useAppDispatch();
    const isOpenMenu = useAppSelector(MenuActive);

    const toggleMenuActive = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className="header">
            <div
                className={`bg-[#fff] header-container  shadow-md border-b border-[#e9edf4] z-[1] w-full h-[75px] tablet:shadow-none tablet:pl-[10px] transition-all ${
                    !isOpenMenu ? 'pl-[280px]' : 'pl-[80px]'
                }`}
            >
                <div onClick={() => toggleMenuActive()}>
                    <HiMenuAlt1 />
                </div>
            </div>
        </div>
    );
};

export default Header;
