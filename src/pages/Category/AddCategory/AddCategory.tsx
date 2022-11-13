import { Button, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField, SelectField } from '~/layouts/components/CustomField';
import CategoryService from '~/services/CategoryService';
import { toSlug } from '~/utils/Slug';
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

const AddCategory = () => {
    const [defaultTab, setDefaultTab] = useState(() => {
        return 1;
    });

    const [category, setCategory] = useState();
    // END STATE
    const toast = useToast();

    const handleSubmitCategory = (values: any) => {
        console.log(values);
        let dataSendRequest = {
            ...values,
            slug: toSlug(values.name),
            status: +values.status,
        };
        requestAddCategory(dataSendRequest);
    };

    const requestAddCategory = (data: any) => {
        CategoryService.addCategory(data).then((res: any) => {
            console.log(res);
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Tạo sản phẩm mới thành công',
                    duration: 2000,
                    status: 'success',
                });
            }
        });
    };

    const getAllCategory = () => {
        let category: any = [];
        CategoryService.getAllCategory().then((res: any) => {
            if (res.statusCode === 200) {
                res.data[0].forEach((itemCat: any) => {
                    if (!itemCat.parent_id) {
                        category.push({ label: itemCat.name, value: itemCat.id });
                    }
                });

                setCategory(category);
            }
        });
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSubmitSubCategory = (values: any) => {
        console.log(values);
        let dataSendRequest = {
            name: values.sub_category,
            parent_id: +values.category,
            slug: toSlug(values.sub_category),
            status: +values.status_sub,
        };
        console.log('dataSendRequest: ', dataSendRequest);
        requestAddCategory(dataSendRequest);
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
                                                            options={category}
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
