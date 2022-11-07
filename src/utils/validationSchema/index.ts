import * as Yup from 'yup';

export const addBannerSchema = () => {
    return Yup.object({
        title: Yup.string().trim().min(6, 'Tiêu đề chính phải lớn hơn 6 kí tự').required('Vui lòng nhập tiêu đề chính'),
        sub_title: Yup.string().min(6, 'Tiêu đề phụ phải lớn hơn 6 kí tự').required('Vui lòng nhập tiêu đề phụ'),
        status: Yup.string().required('Vui lòng điền trạng thái'),
    });
};

export const addCategorySchema = () => {
    return Yup.object({
        name: Yup.string()
            .strict(false)
            .trim()
            .min(6, 'Danh mục phải lớn hơn 6 kí tự')
            .required('Vui lòng nhập danh mục'),
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

export const addProductSchema = () => {
    return Yup.object({
        name: Yup.string().min(10, 'Tên sản phẩm phải lớn hơn 10 kí tự').required('Vui lòng điền tên sản phẩm'),

        classify_1: Yup.array().when('isClassify_1', {
            is: true,
            then: Yup.array().of(
                Yup.object().shape({
                    attribute: Yup.string().required('Phân loại hàng không được bỏ trống'),
                }),
            ),
            otherwise: Yup.array().nullable(),
        }),

        classify_2: Yup.array().when('isClassify_2', {
            is: true,
            then: Yup.array().of(
                Yup.object().shape({
                    attribute: Yup.string().required('Phân loại hàng không được bỏ trống'),
                }),
            ),
            otherwise: Yup.array().nullable(),
        }),

        price: Yup.number().when('isClassify_1', {
            is: false,
            then: (schema) => schema.min(1001, 'Sản phẩm phải lớn hơn 1000 VNĐ').required('Vui lòng nhập giá sản phẩm'),
        }),

        quantity: Yup.number().when('isClassify_1', {
            is: false,
            then: (schema) =>
                schema.min(1, 'Số lượng sản phẩm phải lớn hơn 1').required('Vui lòng nhập số lượng sản phẩm'),
        }),

        description: Yup.string()
            .min(30, 'Mô tả sản phẩm phải lớn hơn 30 kí tự')
            .required('Vui lòng nhập mô tả sản phẩm'),

        name_classify_1: Yup.string().when('isClassify_1', {
            is: true,
            then: (schema) => schema.required('Vui lòng nhập tên nhóm phân loại'),
        }),
        name_classify_2: Yup.string().when('isClassify_1', {
            is: true,
            then: (schema) => schema.required('Vui lòng nhập tên nhóm phân loại'),
        }),
    });
};
