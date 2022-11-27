export type LoginType = {
    username: string;
    password: string;
};

export type BannerType = {
    title: string;
    sub_title: string;
    image: string;
    status: number;
};

export type Category = {
    id?: number;
    name: string;
    slug: string;
    status: number;
    parent_id?: number | null;
    sub_category?: Category[];
};

export type OptionsSelect = {
    value: string | number | undefined;
    label: string;
    parent?: number | undefined;
}[];
