// Different Layout

import NotFound from '~/pages/NotFound';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import { AddProduct, EditProduct } from '~/pages/Product';
import ListProduct from '~/pages/Product/ListProduct';
import { AddCategory, EditCategory, ListCategory } from '~/pages/Category';

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
        path: '/category/edit-category',
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
    // MEDIA
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
