// Different Layout

import { AddBrand, ListBrand } from '~/pages/Brand';
import { AddCategory, EditCategory, ListCategory } from '~/pages/Category';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import { AddBanner, EditBanner, ListBanner } from '~/pages/Media-Banner';
import NotFound from '~/pages/NotFound';
import { AddProduct, EditProduct } from '~/pages/Product';
import ListProduct from '~/pages/Product/ListProduct';
import Register from '~/pages/Register';
import { ListUser } from '~/pages/Users';

interface Routes {
    path: string;
    Component: React.ComponentType;
    layout?: null | any;
}

const privateRoutes: Routes[] = [
    {
        path: '/',
        Component: Dashboard,
    },

    // MEMBER
    {
        path: '/member/list-member',
        Component: ListUser,
    },

    // PRODUCT
    {
        path: '/product/add-product',
        Component: AddProduct,
    },
    {
        path: '/product/edit-product',
        Component: EditProduct,
    },
    {
        path: '/product/list-product',
        Component: ListProduct,
    },
    {
        path: '/product',
        Component: ListProduct,
    },
    // CATEGORY
    {
        path: '/category/add-category',
        Component: AddCategory,
    },
    {
        path: '/category/edit-category/:slug',
        Component: EditCategory,
    },
    {
        path: '/category/list-category',
        Component: ListCategory,
    },
    {
        path: '/category',
        Component: ListCategory,
    },
    // BRAND

    {
        path: '/brand/add-brand',
        Component: AddBrand,
    },
    {
        path: '/brand/list-brand',
        Component: ListBrand,
    },

    // MEDIA

    {
        path: '/media/add-banner',
        Component: AddBanner,
    },
    {
        path: '/media/edit-banner',
        Component: EditBanner,
    },
    {
        path: '/media/list-banner',
        Component: ListBanner,
    },
    {
        path: '/media',
        Component: ListBanner,
    },
];

const publicRoutes: Routes[] = [
    {
        path: '/login',
        Component: Login,
        layout: null,
    },
    {
        path: '*',
        Component: NotFound,
        layout: null,
    },
    {
        path: '/register',
        Component: Register,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
