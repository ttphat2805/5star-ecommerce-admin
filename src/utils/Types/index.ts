export type LoginType = {
    username: string;
    password: string;
};

export type BannerType = {
    title: string;
    sub_title: string;
    image: number;
    status: number;
};

export type CategoryType = {
    id?: number;
    name: string;
    slug: string;
    status: number;
    parent_id?: number | undefined;
    sub_category?: CategoryType[] | any;
};
export type SubCategoryType = {
    parent_id?: string | undefined;
    name_sub: string;
    status_sub: number;
};

export type OptionsSelect = {
    value: string | number | undefined;
    label: string;
    parent?: number | undefined;
}[];

export type ResponseType = {
    statusCode?: number;
    data?: any;
};
