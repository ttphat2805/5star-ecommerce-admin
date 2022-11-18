import { AiOutlineBgColors } from 'react-icons/ai';
import { GiClothes } from 'react-icons/gi';
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
        name: 'Dashboard',
        icon: <TbLayoutDashboard />,
    },

    {
        name: 'Quản trị',
        title: true,
    },
    {
        name: 'Sản phẩm',
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
        name: 'Thuộc tính',
        icon: <AiOutlineBgColors />,
        isParent: true,
        children: [
            {
                path: '/attribute/add-attribute',
                name: 'Thêm thuộc tính',
                icon: <IoIosAdd />,
            },
            {
                path: '/attribute/list-attribute',
                name: 'Danh sách thuộc tính',
                icon: <VscTasklist />,
            },
        ],
    },
];
