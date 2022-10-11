import { Button, FormLabel, Table, Th, Thead, Tr } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import * as Yup from 'yup';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField } from '~/layouts/components/CustomField';
import FieldArrayClassify from '~/layouts/components/CustomField/FieldArrayClassify';
import FieldArrayTable from '~/layouts/components/CustomField/FieldArrayTable';
import ImageUpload from '~/layouts/components/CustomField/ImageUpload';
import SelectField from '~/layouts/components/CustomField/SelectField';
import TextareaField from '~/layouts/components/CustomField/TextareaField';

import './AddProduct.scss';
type Values = {
    name: string;
    price: string;
    category: string;
    description: string;
    name_classify_1: string;
    classify_1: Array<any>;
    name_classify_2: string;
    classify_2: Array<any>;
    variable_attribute: Array<any>;
};

const initialValuesForm: any = {
    name: '',
    price: '',
    category: '',
    description: '',
    name_classify_1: '',
    classify_1: [{ attribute: '' }],
    name_classify_2: '',
    classify_2: [{ attribute: '' }],
    variable_attribute: [],
};

const valuesImageObject = {
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: '',
};

const options: any = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export const addBannerSchema = () => {};

const AddProduct = () => {
    const [image, setImage] = useState<Object | any>(valuesImageObject);
    const [imagePreview, setImagePreview] = useState<Object | any>(valuesImageObject);
    const [imageAttrbute, setImageAttrbute] = useState<Object | any>();
    const [activeAttribute, setActiceAttribute] = useState<any>({
        classify_1: false,
        classify_2: false,
    });

    const handleSubmitForm = (values: Values) => {
        console.log(values);
        console.log(image);
        console.log('imageAttrbute: ', imageAttrbute);

        // console.log('imagePreview: ', imagePreview);
    };

    return (
        <div>
            <Breadcrumb currentPage="Thêm sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
            <div className="add-product m-auto shadow-md rounded-md">
                <div className="card rounded-md p-12">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title !text-black">Thông tin sản phẩm của bạn</h3>
                        </div>
                        <div className="card text-base p-3">
                            <Formik
                                initialValues={initialValuesForm}
                                validationSchema={addProductSchema}
                                onSubmit={(values) => handleSubmitForm(values)}
                            >
                                {(formik: any) => (
                                    <Form>
                                        <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                            <InputField type="text" name="name" label="Tên sản phẩm" />
                                        </div>
                                        <div className="form-group">
                                            <SelectField
                                                name="category"
                                                placeholder="Chọn danh mục sản phẩm"
                                                label="Danh mục"
                                                options={options}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextareaField name="desc" label="Moo tar san pham" />
                                        </div>
                                        {/* UPLOAD IMAGE */}
                                        <div className="upload-image-group mt-3">
                                            <FormLabel className="text-tbase !flex items-center gap-[10px]">
                                                <p>Hình ảnh sản phẩm</p>
                                                <img
                                                    src="https://cdn-icons-gif.flaticon.com/6569/6569140.gif"
                                                    alt=""
                                                    className="inline-block w-[50px]"
                                                />
                                            </FormLabel>
                                            <div className="form-group flex gap-6 flex-wrap mt-4 col-span-5">
                                                {[...Array(5)].map((item: any, index: number) => (
                                                    <ImageUpload
                                                        key={index}
                                                        image={image}
                                                        setImage={setImage}
                                                        imagePreview={imagePreview}
                                                        setImagePreview={setImagePreview}
                                                        name={`image_${index + 1}`}
                                                        label={index === 0 ? 'Ảnh bìa' : `Hình ảnh ${index}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {/*  END UPLOAD IMAGE */}
                                        {/* Attribute Product (Size, Color) */}
                                        <div className="add-attribute my-5">
                                            {!activeAttribute.classify_1 && (
                                                <div className="flex mt-3 items-center">
                                                    <FormLabel className="text-tbase">Phân loại hàng</FormLabel>
                                                    <button
                                                        type="button"
                                                        className="btn ml-4 border-dashed border-[1px] border-primary
                                                         text-primary hover:bg-slate-100 
                                                            transition-all duration-300 !px-[30px] py-[6px] !text-sm !md:text-lg"
                                                        onClick={() =>
                                                            setActiceAttribute({ ...activeAttribute, classify_1: true })
                                                        }
                                                    >
                                                        Thêm nhóm phân loại
                                                    </button>
                                                </div>
                                            )}

                                            {activeAttribute.classify_1 && (
                                                <div className="attribute-product flex items-start md:flex-row flex-col flex-wrap my-8">
                                                    {/* CLASSIFY -- 1 */}
                                                    <div className="classify_1 text-center flex md:flex-row flex-col flex-wrap !h-fit my-5 md:my-0">
                                                        <FormLabel className="text-xl">Nhóm phân loại 1</FormLabel>
                                                        <div className="box relative w-[100%] bg-white px-5 py-5 rounded-md shadow-md border-t">
                                                            <div
                                                                className="hide-attribute absolute top-0 right-0 cursor-pointer p-1 rounded-md"
                                                                onClick={() =>
                                                                    setActiceAttribute({
                                                                        ...activeAttribute,
                                                                        classify_1: false,
                                                                    })
                                                                }
                                                            >
                                                                <IoCloseOutline className="text-lg" />
                                                            </div>
                                                            <div className="form-group">
                                                                <FormLabel className="text-sm">
                                                                    Tên nhóm phân loại
                                                                </FormLabel>
                                                                <InputField
                                                                    type="text"
                                                                    name="name_classify_1"
                                                                    className="my-3"
                                                                />
                                                            </div>

                                                            <div className="form-array">
                                                                <FormLabel className="text-sm">
                                                                    Phân loại hàng
                                                                </FormLabel>
                                                                <FieldArrayClassify formik={formik} name="classify_1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {!activeAttribute.classify_2 && (
                                                        <button
                                                            type="button"
                                                            className="btn ml-4 border-dashed border-[1px] border-primary
                                                        text-primary hover:bg-slate-100 transition-all duration-300 !px-[30px] py-[6px]"
                                                            onClick={() =>
                                                                setActiceAttribute({
                                                                    ...activeAttribute,
                                                                    classify_2: true,
                                                                })
                                                            }
                                                        >
                                                            Thêm nhóm phân loại hàng 2
                                                        </button>
                                                    )}
                                                    {/* CLASSIFY -- 2 */}
                                                    {activeAttribute.classify_2 && (
                                                        <div className="classify_2 text-center md:mx-5 my-3 md:my-0 flex md:flex-row flex-col flex-wrap !h-fit ">
                                                            <FormLabel className="text-xl">Nhóm phân loại 2</FormLabel>
                                                            <div className="box relative  w-[100%] bg-white px-5 py-5 rounded-md shadow-md border-t">
                                                                <div
                                                                    className="hide-attribute absolute top-0 right-0 cursor-pointer p-1 rounded-md"
                                                                    onClick={() =>
                                                                        setActiceAttribute({
                                                                            ...activeAttribute,
                                                                            classify_2: false,
                                                                        })
                                                                    }
                                                                >
                                                                    <IoCloseOutline className="text-lg" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <FormLabel className="text-sm">
                                                                        Tên nhóm phân loại
                                                                    </FormLabel>
                                                                    <InputField
                                                                        type="text"
                                                                        name="name_classify_2"
                                                                        className="my-3"
                                                                    />
                                                                </div>

                                                                <div className="form-array">
                                                                    <FormLabel className="text-sm">
                                                                        Phân loại hàng
                                                                    </FormLabel>
                                                                    {/* FIELD ARRAY --- START */}
                                                                    <FieldArrayClassify
                                                                        formik={formik}
                                                                        name="classify_2"
                                                                    />
                                                                    {/* FIELD ARRAY --- END */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeAttribute.classify_1 && (
                                            <div className="variable-table">
                                                <div className="form card md:w-[53.5%] w-full text-base overflow-x-auto shadow-xl p-5 my-5 border-t-[5px]">
                                                    <Table colorScheme="gray" size="md" className="table-fixed !w-auto">
                                                        <Thead>
                                                            <Tr>
                                                                <Th className="!text-base !text-center">
                                                                    {formik.values.name_classify_1 || 'Tên'}
                                                                </Th>
                                                                <Th className="!text-base !text-center">
                                                                    {formik.values.name_classify_2 || 'Loai'}
                                                                </Th>
                                                                <Th className="!text-base !text-center !w-[200px]">
                                                                    Giá sản phẩm
                                                                </Th>
                                                                <Th className="!text-base !text-center">Kho hàng</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <FieldArrayTable
                                                            formik={formik}
                                                            activeAttribute={activeAttribute}
                                                        />
                                                    </Table>
                                                </div>
                                            </div>
                                        )}

                                        {/* IMAGE UPLOAD FOLLOW CLASSIFY */}
                                        <div className="image-upload-attribute flex gap-6 items-center flex-wrap mt-10">
                                            {activeAttribute.classify_1 && (
                                                <>
                                                    <FormLabel> {formik.values.name_classify_1 || 'Tên'}</FormLabel>
                                                    {formik.values.classify_1.length > 1 &&
                                                        formik.values.classify_1?.map((item1: any, index: any) => (
                                                            <ImageUpload
                                                                key={index}
                                                                image={imageAttrbute}
                                                                setImage={setImageAttrbute}
                                                                imagePreview={imagePreview}
                                                                setImagePreview={setImagePreview}
                                                                name={`image_attribute_${index}`}
                                                                label={item1.attribute}
                                                            />
                                                        ))}
                                                </>
                                            )}
                                        </div>
                                        {/* FIELD PRICE & WAREHOUSE WHEN NO ATTR */}
                                        {!activeAttribute.classify_1 && (
                                            <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                <InputField type="number" name="price" label="Giá" />
                                                <InputField type="number" name="quantity" label="Kho hàng" />
                                            </div>
                                        )}

                                        {/* End --- Price & Warehouse */}
                                        <div className="btn-action flex items-center justify-center mt-5">
                                            {/* isLoading={formik.isSubmitting} */}
                                            <Button type="submit" colorScheme="twitter">
                                                Thêm sản phẩm
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

export default AddProduct;

const addProductSchema = (ok = true) => {
    if (ok) {
        return Yup.object({
            name: Yup.string()
                .min(10, 'Tên sản phẩm phải lớn hơn 10 kí tự')
                .required('Vui lòng điền tên sản phẩm')
                .trim(),
        });
    } else {
        return Yup.object({
            category: Yup.string().required('Required'),
        });
    }
};
