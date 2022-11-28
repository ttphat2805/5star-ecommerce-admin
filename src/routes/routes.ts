// Different Layout

import { AddAttribute, ListAttribute } from '~/pages/Attribute';
import { AddCategory, EditCategory, ListCategory } from '~/pages/Category';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import { AddBanner, EditBanner, ListBanner } from '~/pages/Media-Banner';
import NotFound from '~/pages/NotFound';
import { AddProduct, EditProduct } from '~/pages/Product';
import ListProduct from '~/pages/Product/ListProduct';
import Register from '~/pages/Register';

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
    // ATTRIBUTE

    {
        path: '/attribute/add-attribute',
        Component: AddAttribute,
    },
    {
        path: '/attribute/list-attribute',
        Component: ListAttribute,
    },
    {
        path: '/category',
        Component: ListCategory,
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
