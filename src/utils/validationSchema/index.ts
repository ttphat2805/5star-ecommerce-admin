import * as Yup from 'yup';

export const addBannerSchema = Yup.object({
    title: Yup.string().trim().required('Vui lòng nhập tiêu đề chính').min(6, 'Tiêu đề chính phải lớn hơn 6 kí tự'),
    sub_title: Yup.string().required('Vui lòng nhập tiêu đề phụ').min(6, 'Tiêu đề phụ phải lớn hơn 6 kí tự'),
    link: Yup.string().required('Vui lòng nhập đường dẫn').min(6, 'Đường dẫn phải lớn hơn 6 kí tự'),
    status: Yup.string().required('Vui lòng điền trạng thái'),
});

export const addCategorySchema = Yup.object().shape({
    name: Yup.string().strict(false).trim().min(1, 'Danh mục phải lớn hơn 6 kí tự').required('Vui lòng nhập danh mục'),
    status: Yup.string().required('Vui lòng điền trạng thái'),
});
export const addSubCategorySchema = Yup.object({
    parent_id: Yup.string().required('Vui lòng chọn danh mục chính'),
    name_sub: Yup.string().min(1, 'Danh mục phụ phải lớn hơn 6 kí tự').required('Vui lòng nhập tên danh mục phụ'),
    status_sub: Yup.string().required('Vui lòng điền trạng thái'),
});

export const addProductSchema = Yup.object({
    isClassify_1: Yup.boolean(),
    isClassify_2: Yup.boolean(),
    category: Yup.string().required('Vui lòng chọn danh mục chính'),
    name: Yup.string().trim().min(10, 'Tên sản phẩm phải lớn hơn 10 kí tự').required('Vui lòng điền tên sản phẩm'),
    info_detail: Yup.array(
        Yup.string().required('Vui lòng nhập thông tin vào ô này').min(20, 'Thông tin chi tiết phải lớn hơn 20 kí tự'),
    ),
    classify_1: Yup.array().when('isClassify_1', {
        is: true,
        then: Yup.array(
            Yup.object({
                attribute: Yup.string().required('Phân loại hàng không được bỏ trống'),
            }),
        ),
    }),

    classify_2: Yup.array().when('isClassify_2', {
        is: true,
        then: Yup.array().of(
            Yup.object().shape({
                attribute: Yup.string().required('Phân loại hàng không được bỏ trống'),
            }),
        ),
    }),

    price: Yup.number().when('isClassify_1', {
        is: false,
        then: (schema) => schema.min(1001, 'Sản phẩm phải lớn hơn 1000 VNĐ').required('Vui lòng nhập giá sản phẩm'),
    }),

    quantity: Yup.number().when('isClassify_1', {
        is: false,
        then: (schema) => schema.min(1, 'Số lượng sản phẩm phải lớn hơn 1').required('Vui lòng nhập số lượng sản phẩm'),
    }),

    // name_classify_1: Yup.string().when('isClassify_1', {
    //     is: true,
    //     then: (schema) => schema.required('Vui lòng nhập tên nhóm phân loại'),
    // }),
    // name_classify_2: Yup.string().when('isClassify_1', {
    //     is: true,
    //     then: (schema) => schema.required('Vui lòng nhập tên nhóm phân loại'),
    // }),
});

// AUTH SCHEMA

export const LoginSchema = Yup.object({
    username: Yup.string().required('Vui lòng điền tên đăng nhập'),
    password: Yup.string().min(6, 'Mật khẩu phải lớn hơn 6 kí tự').required('Vui lòng điền mật khẩu'),
});
