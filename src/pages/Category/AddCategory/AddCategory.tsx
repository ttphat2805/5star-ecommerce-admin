import { Button, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField, SelectField } from '~/layouts/components/CustomField';
import CategoryService from '~/services/CategoryService';
import { toSlug } from '~/utils/Slug';
import { CategoryType, OptionsSelect, SubCategoryType } from '~/utils/Types';
import { addCategorySchema, addSubCategorySchema } from '~/utils/validationSchema';
type Values = {
    name: string;
    status: number;
};

const initialValuesForm_Category = {
    name: '',
    status: 2,
};

const initialValuesForm_SubCategory = {
    parent_id: '',
    name_sub: '',
    status_sub: 2,
};

const AddCategory = () => {
    const [optionsCategory, setOptionsCategory] = useState<OptionsSelect>();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const Navigate = useNavigate();

    // INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues: initialValuesForm_Category, resolver: yupResolver(addCategorySchema) });

    const {
        handleSubmit: handleSubmitSub,
        control: controlSub,
        reset: resetSub,
        formState: { errors: errorsSub },
    } = useForm<SubCategoryType>({
        defaultValues: initialValuesForm_SubCategory,
        resolver: yupResolver(addSubCategorySchema),
    });

    // ==== END INIT FORM
    // END STATE

    const requestAddCategory = (data: CategoryType, type: string) => {
        setLoading(true);
        CategoryService.addCategory(data).then((res: any) => {
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Tạo danh mục mới thành công',
                    duration: 2000,
                    status: 'success',
                });
                if (type === 'category') {
                    reset(initialValuesForm_Category);
                } else {
                    resetSub(initialValuesForm_SubCategory);
                    Navigate('/category/list-category');
                }
                getAllCategory();
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const getAllCategory = () => {
        let category: OptionsSelect = [];
        CategoryService.getCategoryParent().then((res: any) => {
            if (res) {
                res.forEach((itemCat: CategoryType) => {
                    category.push({ label: itemCat.name, value: itemCat.id });
                });
                setOptionsCategory(category);
            }
        });
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleSubmitSubCategory = (values: SubCategoryType) => {
        let dataSendRequest: CategoryType = {
            name: values.name_sub,
            parent_id: Number(values.parent_id),
            slug: toSlug(values.name_sub),
            status: +Number(values.status_sub),
        };
        requestAddCategory(dataSendRequest, 'subCategory');
    };

    const handleSubmitCategory = (values: Values) => {
        let dataSendRequest = {
            ...values,
            slug: toSlug(values.name),
            status: +values.status,
        };
        requestAddCategory(dataSendRequest, 'category');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Thêm danh mục" currentLink="list-product" parentPage="Danh mục" />
            <div className="add-category">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm danh mục mới</h3>
                        </div>
                        <Tabs className="mt-4" variant="soft-rounded" colorScheme="twitter">
                            <TabList>
                                <Tab>Danh mục chính</Tab>
                                <Tab className="mx-3">Danh mục phụ</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <div className="card text-base p-3">
                                        <form onSubmit={handleSubmit(handleSubmitCategory)}>
                                            <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                <InputField
                                                    name="name"
                                                    label="Tên danh mục"
                                                    control={control}
                                                    error={errors}
                                                />
                                            </div>
                                            <div className="form-group mt-3">
                                                <FormLabel>Trạng thái</FormLabel>
                                                <div className=" flex gap-2">
                                                    <RadioField
                                                        label="Hiện"
                                                        name="status"
                                                        value={1}
                                                        id="status-1"
                                                        control={control}
                                                        error={errors}
                                                    />
                                                    <RadioField
                                                        label="Ẩn"
                                                        name="status"
                                                        value={2}
                                                        id="status-2"
                                                        control={control}
                                                        error={errors}
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn-action flex items-center justify-center mt-5">
                                                <Button
                                                    type="submit"
                                                    colorScheme="twitter"
                                                    isLoading={loading}
                                                    disabled={loading}
                                                >
                                                    Thêm danh mục
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className="mx-2"
                                                    onClick={() => Navigate('/category/list-category')}
                                                >
                                                    Quay lại
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card text-base p-3">
                                        <form onSubmit={handleSubmitSub(handleSubmitSubCategory)}>
                                            <div className="form-group grid gird-cols-1 md:grid-cols-2">
                                                <SelectField
                                                    name="parent_id"
                                                    placeholder="Chọn danh mục chính..."
                                                    label="Danh mục chính"
                                                    options={optionsCategory}
                                                    control={controlSub}
                                                    error={errorsSub}
                                                />
                                            </div>
                                            <div className=" my-3 form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                <InputField
                                                    type="text"
                                                    name="name_sub"
                                                    label="Tên danh mục phụ"
                                                    control={controlSub}
                                                    error={errorsSub}
                                                />
                                            </div>
                                            <div className="form-group mt-3">
                                                <FormLabel>Trạng thái</FormLabel>
                                                <div className=" flex gap-2">
                                                    <RadioField
                                                        label="Hiện"
                                                        name="status_sub"
                                                        value={1}
                                                        id="status-3"
                                                        control={controlSub}
                                                        error={errorsSub}
                                                    />
                                                    <RadioField
                                                        label="Ẩn"
                                                        name="status_sub"
                                                        value={2}
                                                        id="status-4"
                                                        control={controlSub}
                                                        error={errorsSub}
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn-action flex items-center justify-center mt-5">
                                                <Button
                                                    type="submit"
                                                    colorScheme="twitter"
                                                    isLoading={loading}
                                                    disabled={loading}
                                                >
                                                    Thêm danh mục
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className="mx-2"
                                                    onClick={() => Navigate('/category/list-category')}
                                                >
                                                    Quay lại
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddCategory;
