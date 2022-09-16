import React from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
const Header = (props: any) => {
    const { isOpen, setIsOpen } = props;
    return (
        <div className="header">
            <div className="bg-[#fff] shadow-md border-b border-[#e9edf4] pl-[285px] z-[1] w-full h-[75px]">
                <div onClick={() => setIsOpen(!isOpen)}>
                    <HiMenuAlt1 />
                </div>
            </div>
        </div>
    );
};

export default Header;
