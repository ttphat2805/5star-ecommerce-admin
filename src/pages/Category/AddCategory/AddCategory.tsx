import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField } from '~/layouts/components/CustomField';
import { addProductSchema } from '~/utils/validationSchema';
type Values = {
    name: string;
    price: string;
};

const initialValues = {
    name: '',
    price: '',
};

const AddCategory = () => {
    const handleSubmitForm = (values: Values) => {
        console.log(values);
    };

    return (
        <div>
            <Breadcrumb currentPage="Thêm danh mục" currentLink="list-product" parentPage="Danh mục" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm danh mục mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={addProductSchema}
                                onSubmit={(values) => handleSubmitForm(values)}
                            >
                                {(formik: FormikProps<Values>) => (
                                    <Form>
                                        <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                            <InputField type="text" name="name" label="Tên danh mục" />
                                            <InputField type="text" name="price" label="Giá" />
                                        </div>
                                        <div className="btn-action flex items-center justify-center mt-5">
                                            <Button isLoading={formik.isSubmitting} type="submit" colorScheme="twitter">
                                                Thêm danh mục
                                            </Button>
                                            <Button type="button" className="mx-2">
                                                Quay lại
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
