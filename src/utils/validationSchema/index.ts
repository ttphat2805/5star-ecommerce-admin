import * as Yup from 'yup';

export const addBannerSchema = () => {
    return Yup.object({
        title: Yup.string().min(6, 'Tiêu đề chính phải lớn hơn 6 kí tự').required('Vui lòng nhập tiêu đề chính'),
        sub_title: Yup.string().min(6, 'Tiêu đề phụ phải lớn hơn 6 kí tự').required('Vui lòng nhập tiêu đề phụ'),
        status: Yup.string().required('Vui lòng điền trạng thái'),
    });
};

export const addCategorySchema = () => {
    return Yup.object({
        name: Yup.string().min(6, 'Danh mục phải lớn hơn 6 kí tự').required('Vui lòng nhập danh mục'),
        status: Yup.string().required('Vui lòng điền trạng thái'),
    });
};

export const addSubCategorySchema = () => {
    return Yup.object({
        category: Yup.string().required('Vui lòng nhập danh mục chính'),
        sub_category: Yup.string().min(6, 'Danh mục phụ phải lớn hơn 6 kí tự').required('Vui lòng nhập Danh mục phụ'),
        status_sub: Yup.string().required('Vui lòng điền trạng thái'),
    });
};
