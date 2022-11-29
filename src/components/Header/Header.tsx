import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@chakra-ui/react';
import { BiMessageSquareCheck } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { IoMdLogOut, IoMdNotificationsOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import './Header.scss';
const Header = () => {
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isOpenMenu = useAppSelector(MenuActive);

    const toggleMenuActive = () => {
        dispatch(toggleMenu());
    };

    const handleLogout = () => {
        console.log('vo day');

        localStorage.removeItem('access_token');
        Navigate('/login');
    };

    return (
        <div className="header fixed left-0 right-0 z-30">
            <div
                className={`bg-[#fff] relative header-container w-full shadow-md border-b border-[#e9edf4]  h-[75px]  tablet:shadow-none tablet:pl-[10px] transition-all ${
                    !isOpenMenu ? 'pl-[295px]' : 'pl-[95px]'
                }`}
            >
                <div className="flex justify-between h-full items-center mr-[16px]">
                    <div className="btn-toggle-menu p-2">
                        <button
                            className="cursor-pointer relative hover:opacity-70 before:block before:absolute before:left-[-10px] 
                        before:w-[20px] before:h-[23px] before:bg-transparent"
                            onClick={() => toggleMenuActive()}
                        >
                            {isOpenMenu ? <HiMenuAlt2 /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                    <div className="header-right mr-[20px]">
                        <ul className="nav-list flex gap-[10px] items-center text-2xl text-tbase">
                            {/* SEARCH */}
                            <li className="cursor-pointer rounded-full">
                                <div className="search z-20">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button className="!p-2 !bg-transparent hover:!bg-hover hover:text-primary">
                                                <Tooltip label="Tìm kiếm">
                                                    <div className="text-lg">
                                                        <BsSearch />
                                                    </div>
                                                </Tooltip>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="mr-[120px]">
                                            <div className="menu-dropdown bg-white text-base shadow-xl rounded-md">
                                                <div className="search-form p-4 border-b">
                                                    <form className="border-b pb-1">
                                                        <div className="flex items-center">
                                                            <span className="text-xl cursor-pointer">
                                                                <BsSearch />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                placeholder="Tìm kiếm..."
                                                                className="w-full p-2 pb-3 outline-none text-sm"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </li>
                            {/* NOTIFICATION */}
                            <li className="cursor-pointer">
                                <div className="notification relative z-20">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button className="!p-2 !bg-transparent hover:!bg-hover hover:text-primary">
                                                <Tooltip label="Thông báo">
                                                    <div className="icon relative text-2xl">
                                                        <IoMdNotificationsOutline />
                                                        <span className="badge absolute w-[14px] h-[14px] top-[-3px] right-[-5px] text-[9px] bg-red-500 text-white rounded-full text-center leading-[14px]">
                                                            9
                                                        </span>
                                                    </div>
                                                </Tooltip>
                                                <span className="pulse"></span>
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="mr-[70px]">
                                            <div className="menu-dropdown bg-white text-base shadow-xl rounded-md">
                                                <div className="dropdown-header-title p-3 border-b">
                                                    <h3 className="text-base font-medium">Thông báo</h3>
                                                </div>
                                                <ul className="list-menu p-2 py-3 z-50">
                                                    {[1].map((menu, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                to=""
                                                                className="flex items-center my-1 hover:bg-hover hover:text-primary hover:transition-all hover:duration-300 rounded-md px-3 py-1"
                                                            >
                                                                <span className="icon bg-primary p-1 rounded-md text-white text-xl mr-2">
                                                                    <BiMessageSquareCheck />
                                                                </span>
                                                                <span className="title font-medium">
                                                                    Bạn vừa nhận một tin nhắn mới
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </li>
                            {/* AVATAR */}
                            <li className="cursor-pointer">
                                <div className="avatar w-9 h-9 relative z-20">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button className="!w-full !p-0 !bg-transparent">
                                                <Tooltip label="Tùy chỉnh">
                                                    <div className="icon relative w-full">
                                                        <img
                                                            className="w-full h-full rounded-full"
                                                            src="https://pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/assets/img/avatars/1.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent marginRight="20px" width="200px">
                                            <div className="menu-dropdown bg-white text-base shadow-xl rounded-md w-[200px]">
                                                <div className="account flex border-b p-4 items-center">
                                                    <div className="img-avatar h-[50px] w-[50px]">
                                                        <img
                                                            src="https://pixinvent.com/demo/frest-clean-bootstrap-admin-dashboard-template/assets/img/avatars/1.png"
                                                            alt=""
                                                            className="w-full h-full rounded-full border-2 border-gray-300 border-solid"
                                                        />
                                                    </div>
                                                    <div className="info ml-3 text-sm">
                                                        <div className="fullname font-bold">Admin Name</div>
                                                        <div className="role">#SuperAdmin</div>
                                                    </div>
                                                </div>
                                                <ul className="list-menu p-2 py-3">
                                                    {[1].map((menu, index) => (
                                                        <li key={index} onClick={handleLogout}>
                                                            <Link
                                                                to=""
                                                                className="flex items-center hover:bg-hover hover:text-primary hover:transition-all hover:duration-300 rounded-md px-3 py-1"
                                                            >
                                                                <span className="icon mr-1">
                                                                    <IoMdLogOut />
                                                                </span>
                                                                <span className="title font-medium">Đăng xuất</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
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
