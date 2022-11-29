import { AiOutlineBgColors } from 'react-icons/ai';
import { GiClothes } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoIosAdd } from 'react-icons/io';
import { MdOutlineCategory, MdOutlinePermMedia } from 'react-icons/md';
import { TbLayoutDashboard } from 'react-icons/tb';
import { VscTasklist } from 'react-icons/vsc';
export const RouteSidebarMenu = [
    {
        name: 'Main',
        title: true,
    },
    {
        path: '/',
        name: 'Tổng quan',
        icon: <TbLayoutDashboard />,
    },

    {
        name: 'Quản trị',
        title: true,
    },
    {
        name: 'Thành viên',
        icon: <HiUserGroup />,
        color: 'text-blue-400',
        isParent: true,
        children: [
            {
                path: '/member/list-member',
                name: 'Danh sách thành viên',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Sản phẩm',
        color: 'text-blue-400',
        icon: <GiClothes />,
        isParent: true,
        children: [
            {
                path: '/product/add-product',
                name: 'Thêm sản phẩm',
                icon: <IoIosAdd />,
            },
            {
                path: '/product/list-product',
                name: 'Danh sách sản phẩm',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Danh mục',
        icon: <MdOutlineCategory />,
        color: 'text-blue-400',
        isParent: true,
        children: [
            {
                path: '/category/add-category',
                name: 'Thêm danh mục',
                icon: <IoIosAdd />,
            },
            {
                path: '/category/list-category',
                name: 'Danh sách danh mục',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Đa phương tiện',
        color: 'text-blue-400',
        icon: <MdOutlinePermMedia />,
        isParent: true,
        children: [
            {
                path: '/media/add-banner',
                name: 'Thêm banner',
                icon: <IoIosAdd />,
            },
            {
                path: '/media/list-banner',
                name: 'Danh sách banner',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Thương hiệu',
        icon: <AiOutlineBgColors />,
        color: 'text-blue-400',
        isParent: true,
        children: [
            {
                path: '/brand/add-brand',
                name: 'Thêm thương hiệu',
                icon: <IoIosAdd />,
            },
            {
                path: '/brand/list-brand',
                name: 'Danh sách thương hiệu',
                icon: <VscTasklist />,
            },
        ],
    },
];
