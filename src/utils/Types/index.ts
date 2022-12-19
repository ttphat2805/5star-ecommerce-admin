export type LoginType = {
    username: string;
    password: string;
};

export type BannerType = {
    title: string;
    sub_title: string;
    link: string;
    image: number | string;
    status: number;
};

export type CategoryType = {
    id?: number;
    name: string;
    slug: string;
    priority?: number;
    status: number;
    parent_id?: number | undefined;
    sub_category?: CategoryType[] | any;
};
export type SubCategoryType = {
    parent_id?: string | undefined;
    name_sub: string;
    status_sub: number;
    priority?: number;
};

export type OptionsSelect = {
    value: string | number | undefined;
    label: string;
    parent?: number | undefined;
}[];

export type ResponseType = {
    statusCode?: number;
    data?: any;
    message?: string;
};

export type CouponType = {
    name?: string;
    code: string;
    expirate_date: string;
    start_date: string;
    quantity: number;
    type: number;
    discount: number;
    min_order: number;
    max_order: number;
    status?: number;
};
