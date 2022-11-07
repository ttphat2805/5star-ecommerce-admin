import { Button, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField, SelectField } from '~/layouts/components/CustomField';
import { addCategorySchema, addSubCategorySchema } from '~/utils/validationSchema';
type Values = {
    name: string;
    status: string;
};

type ValuesSubCate = {
    category: string;
    sub_category: string;
    status_sub: string;
};

const initialValuesForm_Category = {
    name: '',
    status: '0',
};

const initialValuesForm_SubCategory = {
    category: '',
    sub_category: '',
    status_sub: '0',
};
const options: any = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const AddCategory = () => {
    const [defaultTab, setDefaultTab] = useState(() => {
        return 1;
    });

    const handleSubmitCategory = (values: Values | ValuesSubCate) => {
        console.log(values);
    };

    const handleSubmitSubCategory = (values: Values | ValuesSubCate) => {
        console.log(values);
    };
    return (
        <div>
            <Breadcrumb currentPage="Thêm danh mục" currentLink="list-product" parentPage="Danh mục" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title" onClick={() => setDefaultTab(1)}>
                                Thêm danh mục mới
                            </h3>
                        </div>
                        <Tabs className="mt-4" variant="soft-rounded" colorScheme="twitter" defaultIndex={defaultTab}>
                            <TabList>
                                <Tab>Danh mục chính</Tab>
                                <Tab className="mx-3">Danh mục phụ</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <div className="card text-base p-3">
                                        <Formik
                                            initialValues={initialValuesForm_Category}
                                            validationSchema={addCategorySchema}
                                            onSubmit={(values: Values) => handleSubmitCategory(values)}
                                        >
                                            {(formik: FormikProps<Values>) => (
                                                <Form>
                                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                        <InputField type="text" name="name" label="Tên danh mục" />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <FormLabel>Trạng thái</FormLabel>
                                                        <div className=" flex gap-2">
                                                            <RadioField
                                                                label="Hiện"
                                                                name="status"
                                                                value="1"
                                                                id="status-1"
                                                            />
                                                            <RadioField
                                                                label="Ẩn"
                                                                name="status"
                                                                value="0"
                                                                id="status-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="btn-action flex items-center justify-center mt-5">
                                                        <Button type="submit" colorScheme="twitter">
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
                                </TabPanel>
                                <TabPanel>
                                    <div className="card text-base p-3">
                                        <Formik
                                            initialValues={initialValuesForm_SubCategory}
                                            validationSchema={addSubCategorySchema}
                                            onSubmit={(values: ValuesSubCate) => handleSubmitSubCategory(values)}
                                        >
                                            {(formik: FormikProps<ValuesSubCate>) => (
                                                <Form>
                                                    <div className="form-group grid gird-cols-1 md:grid-cols-2">
                                                        <SelectField
                                                            name="category"
                                                            placeholder="Chọn danh mục chính..."
                                                            label="Danh mục chính"
                                                            options={options}
                                                        />
                                                    </div>
                                                    <div className=" my-3 form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                        <InputField
                                                            type="text"
                                                            name="sub_category"
                                                            label="Tên danh mục phụ"
                                                        />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <FormLabel>Trạng thái</FormLabel>
                                                        <div className=" flex gap-2">
                                                            <RadioField
                                                                label="Hiện"
                                                                name="status_sub"
                                                                value="1"
                                                                id="status-3"
                                                            />
                                                            <RadioField
                                                                label="Ẩn"
                                                                name="status_sub"
                                                                value="0"
                                                                id="status-4"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="btn-action flex items-center justify-center mt-5">
                                                        <Button type="submit" colorScheme="twitter">
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
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
