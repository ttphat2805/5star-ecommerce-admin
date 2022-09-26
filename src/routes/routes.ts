// Different Layout

import NotFound from '~/pages/NotFound';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import { AddProduct, EditProduct } from '~/pages/Product';

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
    {
        path: '/product/add-product',
        Component: AddProduct,
    },
    {
        path: '/product/edit-product',
        Component: EditProduct,
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
