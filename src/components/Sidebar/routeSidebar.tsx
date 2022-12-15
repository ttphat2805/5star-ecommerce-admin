import { AiOutlineBgColors } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { GiClothes } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoIosAdd } from 'react-icons/io';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineCategory, MdOutlinePermMedia } from 'react-icons/md';
import { TbBuildingStore, TbDiscount2, TbLayoutDashboard } from 'react-icons/tb';
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
        path: '/member',
        icon: <HiUserGroup />,
        color: 'text-[#00DBDE]',
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
        color: 'text-[#6284FF]',
        path: '/product',
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
        path: '/category',
        color: 'text-[#2BD2FF]',
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
        name: 'Đơn hàng',
        path: '/order',
        icon: <BsCart4 />,
        color: 'text-[#FF3CAC]',
        isParent: true,
        children: [
            {
                path: '/order/list-order',
                name: 'Danh sách cửa hàng',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Đa phương tiện',
        color: 'text-[#FF6A88]',
        icon: <MdOutlinePermMedia />,
        path: '/media',
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
        path: '/brand',
        icon: <AiOutlineBgColors />,
        color: 'text-[#2B86C5]',
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
    {
        name: 'Mã giảm giá',
        icon: <TbDiscount2 />,
        path: '/coupon',
        color: 'text-[#16A085]',
        isParent: true,
        children: [
            {
                path: '/coupon/add-coupon',
                name: 'Thêm mã giảm giá',
                icon: <IoIosAdd />,
            },
            {
                path: '/coupon/list-coupon',
                name: 'Danh sách mã giảm giá',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Bài viết',
        path: '/blog',
        icon: <IoNewspaperOutline />,
        color: 'text-[#9FACE6]',
        isParent: true,
        children: [
            {
                path: '/blog/add-blog',
                name: 'Thêm bài viết',
                icon: <IoIosAdd />,
            },
            {
                path: '/blog/list-blog',
                name: 'Danh sách bài viết',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Hệ thống cửa hàng',
        path: '/store',
        icon: <TbBuildingStore />,
        color: 'text-[#2B86C5]',
        isParent: true,
        children: [
            {
                path: '/store/add-store',
                name: 'Thêm cửa hàng',
                icon: <IoIosAdd />,
            },
            {
                path: '/store/list-store',
                name: 'Danh sách cửa hàng',
                icon: <VscTasklist />,
            },
        ],
    },
];
