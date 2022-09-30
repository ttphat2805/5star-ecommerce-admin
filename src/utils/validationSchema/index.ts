import * as Yup from 'yup';

export const addProductSchema = () => {
    return Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    });
};

export const addBannerSchema = () => {
    return Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề chính'),
        sub_title: Yup.string().required('Vui lòng nhập tiêu đề phụ'),
    });
};
