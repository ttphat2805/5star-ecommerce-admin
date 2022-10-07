import * as Yup from 'yup';

export const addProductSchema = () => {
    return Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        classify_1: Yup.array()
            .of(
                Yup.object().shape({
                    attribute: Yup.string().required('Required'),
                }),
            )
            .required('Must have friends'),
    });
};

export const addBannerSchema = () => {
    return Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề chính'),
        sub_title: Yup.string().required('Vui lòng nhập tiêu đề phụ'),
    });
};
