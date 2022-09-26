import { BiUserPin } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';

export const RouteSidebarMenu = [
    {
        name: 'Main',
        title: true,
    },
    {
        path: '/',
        name: 'Dashboard Home Page',
        icon: <TbLayoutDashboard />,
    },

    {
        name: 'Quản trị',
        title: true,
    },
    {
        name: 'Sản phẩm',
        icon: <BiUserPin />,
        isParent: true,
        children: [
            {
                path: '/product/add-product',
                name: 'Thêm sản phẩm',
                icon: <BiUserPin />,
            },
            {
                path: '/2',
                name: 'Table',
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
