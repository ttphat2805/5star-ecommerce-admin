// Different Layout

import { AddBlog, ListBlog } from '~/pages/Blog';
import EditBlog from '~/pages/Blog/EditBlog';
import { AddBrand, ListBrand } from '~/pages/Brand';
import { AddCategory, EditCategory, ListCategory } from '~/pages/Category';
import { AddCoupon, ListCoupon } from '~/pages/Coupon';
import EditCoupon from '~/pages/Coupon/EditCoupon';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import { AddBanner, EditBanner, ListBanner } from '~/pages/Media-Banner';
import NotFound from '~/pages/NotFound';
import { ListOrder } from '~/pages/Order';
import OrderDetail from '~/pages/Order/OrderDetail';
import { AddProduct, EditProduct } from '~/pages/Product';
import ListProduct from '~/pages/Product/ListProduct';
import Statistical from '~/pages/Statistical';
import { AddStore, EditStore, ListStore } from '~/pages/Store';
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
    {
        path: '/member',
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

    {
        path: '/brand',
        Component: ListBrand,
    },
    // MEDIA

    {
        path: '/media/add-banner',
        Component: AddBanner,
    },
    {
        path: '/media/edit-banner/:id',
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

    // BLOG
    {
        path: '/blog',
        Component: ListBlog,
    },
    {
        path: '/blog/add-blog',
        Component: AddBlog,
    },
    {
        path: '/blog/list-blog',
        Component: ListBlog,
    },
    {
        path: '/blog/update-blog/:slug',
        Component: EditBlog,
    },

    // COUPON
    {
        path: '/coupon',
        Component: ListCoupon,
    },
    {
        path: '/coupon/add-coupon',
        Component: AddCoupon,
    },
    {
        path: '/coupon/list-coupon',
        Component: ListCoupon,
    },
    {
        path: '/coupon/update-coupon/:id',
        Component: EditCoupon,
    },
    // STORE
    {
        path: '/store',
        Component: ListStore,
    },
    {
        path: '/store/add-store',
        Component: AddStore,
    },
    {
        path: '/store/list-store',
        Component: ListStore,
    },
    {
        path: '/store/update-store/:id',
        Component: EditStore,
    },

    // ORDER
    {
        path: '/order',
        Component: ListOrder,
    },
    {
        path: '/order/list-order',
        Component: ListOrder,
    },
    {
        path: '/order/:id',
        Component: OrderDetail,
    },

    // CHART
    {
        path: '/statistical',
        Component: Statistical,
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
];

export { publicRoutes, privateRoutes };
