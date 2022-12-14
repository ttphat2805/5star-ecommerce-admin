import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Breadcrumb from '~/components/Breadcrumb';
import { FieldArrayTable, FieldColorPicker, FieldSize, ImageUpload } from '~/layouts/components/AddProduct';
import InfoDetail from '~/layouts/components/AddProduct/InfoDetail';
import { InputField, RadioField, SelectField } from '~/layouts/components/CustomField';
import BrandService from '~/services/BrandService';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';
import UploadService from '~/services/UploadService';
import { toSlug } from '~/utils/Slug';
import { CategoryType, OptionsSelect, ResponseType } from '~/utils/Types';
import './AddProduct.scss';
type Values = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    subCategory: string;
    description: string;
    name_classify_1: string;
    classify_1: Array<any>;
    name_classify_2: string;
    classify_2: Array<any>;
    variable_attribute: any;
    isClassify_1: boolean;
    isClassify_2: boolean;
    info_detail: Array<any>;
    status: number;
    id_brand: number;
};

const initialValuesForm: Values = {
    name: '',
    price: 0,
    quantity: 0,
    category: '',
    subCategory: '',
    description: '',
    name_classify_1: '',
    classify_1: [{ attribute: '' }],
    name_classify_2: '',
    classify_2: [{ attribute: '' }],
    variable_attribute: [{ price: '', quantity: '' }],
    isClassify_1: false,
    isClassify_2: false,
    info_detail: [''],
    status: 2,
    id_brand: 0,
};

const valuesImageObject = {
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: '',
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
};
let optionsBrand: any = [];
export const addBannerSchema = () => {};
const AddProduct = () => {
    const [image, setImage] = useState<Object | any>(valuesImageObject);
    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<Object | any>(valuesImageObject);
    // const [imageAttrbute, setImageAttrbute] = useState<Object | any>();
    const [activeAttribute, setActiceAttribute] = useState<any>({
        classify_1: false,
        classify_2: false,
    });
    const [description, setDescription] = useState<ReactQuill.Value | undefined>();
    const [optionsCategory, setOptionsCategory] = useState<OptionsSelect>();
    const [dataSubCategory, setDataSubCategory] = useState<OptionsSelect>();
    const [optionsSubCategory, setOptionsSubCategory] = useState<OptionsSelect>();

    const Navigate = useNavigate();

    // INIT FORM
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<Values>({ defaultValues: initialValuesForm });
    // resolver: yupResolver(addProductSchema)

    const categoryParentValue: number = +watch('category');
    useEffect(() => {
        const optionsSubCategoryNew = dataSubCategory?.filter((item: any) => item.parent === categoryParentValue);
        setOptionsSubCategory(optionsSubCategoryNew);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryParentValue]);

    // END STATE
    const toast = useToast();

    const getAllCategory = () => {
        let category: OptionsSelect = [];
        let subCategory: OptionsSelect = [];
        CategoryService.getAllCategory({}).then((res: any) => {
            if (res.statusCode === 200) {
                res.data.data.forEach((itemCat: CategoryType) => {
                    if (!itemCat.parent_id) {
                        category.push({ label: itemCat.name, value: itemCat.id });
                    } else {
                        subCategory.push({ label: itemCat.name, value: itemCat.id, parent: itemCat.parent_id });
                    }
                });

                setOptionsCategory(category);
                setDataSubCategory(subCategory);
            }
        });
    };

    const getAllBrands = () => {
        BrandService.GetBrands().then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    optionsBrand = [];
                    for (let item of res.data.data) {
                        let newOptios = { value: item.id, label: item.name };
                        optionsBrand.push(newOptios);
                    }
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getAllBrands();
        getAllCategory();
    }, []);

    const handleSubmitForm = async (values: Values) => {
        setLoading(true);
        const imageArray: any = [];
        for (let imageItem of Object.values(image)) {
            if (imageItem) {
                imageArray.push(imageItem);
            }
        }

        const imageUploadRes = await UploadService.handleUploadImages(imageArray);

        let dataSendRequest = {
            ...values,
            images: imageUploadRes,
            id_brand: Number(values.id_brand),
            slug: toSlug(values.name),
            description: description,
            id_category: values.subCategory ? +values.subCategory : +values.category,
        };

        ProductService.addProduct(dataSendRequest).then((res: ResponseType) => {
            if (res.statusCode === 201) {
                reset(initialValuesForm);
                setLoading(false);
                toast({
                    position: 'top-right',
                    title: 'T???o s???n ph???m m???i th??nh c??ng',
                    duration: 2000,
                    status: 'success',
                });
                Navigate('/product/list-product');
            } else if (res.statusCode === 409 && res.message === 'slug already exist') {
                toast({
                    position: 'top-right',
                    title: 'T??n s???n ph???m n??y ???? t???n t???i',
                    duration: 2000,
                    status: 'warning',
                });
            } else {
                toast({
                    position: 'top-right',
                    title: 'T???o th???t b???i',
                    duration: 2000,
                    status: 'error',
                });
                Navigate('/product/list-product');
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Th??m s???n ph???m" parentLink="list-product" parentPage="S???n ph???m" />
            <div className="add-product m-auto shadow-md rounded-md">
                <div className="card rounded-md md:p-12 p-3">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title !text-black">Th??ng tin s???n ph???m c???a b???n </h3>
                        </div>
                        <div className="card text-base md:p-3">
                            <form onSubmit={handleSubmit(handleSubmitForm)}>
                                <div className="form-group">
                                    <InputField name="name" label="T??n s???n ph???m" control={control} error={errors} />
                                </div>
                                <div className="row grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="form-group">
                                        <SelectField
                                            name="category"
                                            placeholder="Ch???n danh m???c ch??nh"
                                            label="Danh m???c ch??nh"
                                            options={optionsCategory}
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <SelectField
                                            name="subCategory"
                                            placeholder="Ch???n danh m???c ph???"
                                            label="Danh m???c ph???"
                                            options={optionsSubCategory}
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="form-group my-5 md:h-[200px] h-[250px]">
                                    <FormLabel className="text-tbase">M?? t??? s???n ph???m</FormLabel>
                                    <ReactQuill
                                        className="custom-quill h-[120px] "
                                        theme="snow"
                                        value={description || ''}
                                        onChange={(data) => setDescription(data)}
                                        modules={modules}
                                        placeholder="Nh???p m?? t??? s???n ph???m c???a b???n..."
                                    />
                                    {/* <TextareaField
                                        name="description"
                                        label="M?? t??? s???n ph???m"
                                        control={control}
                                        error={errors}
                                    /> */}
                                </div>
                                <div className="brand my-2">
                                    <FormLabel className="text-sm">T??n th????ng hi???u</FormLabel>
                                    <Select
                                        options={optionsBrand}
                                        onChange={(e: any) => setValue('id_brand', e.value)}
                                        isClearable={true}
                                        placeholder="Ch???n th????ng hi???u cho s???n ph???m c???a b???n...."
                                    />
                                </div>
                                <div className="info-detail">
                                    <FormLabel className="text-sm">Th??ng tin chi ti???t</FormLabel>
                                    <InfoDetail name="info_detail" control={control} error={errors} />
                                </div>

                                {/* UPLOAD IMAGE */}
                                <div className="upload-image-group mt-3">
                                    <FormLabel className="text-tbase !flex items-center gap-[10px]">
                                        <p>H??nh ???nh s???n ph???m</p>
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
                                                label={index === 0 ? '???nh b??a' : `H??nh ???nh ${index}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {/*  END UPLOAD IMAGE */}

                                {/* Attribute Product (Size, Color) */}
                                <div className="add-attribute my-5 flex">
                                    {!activeAttribute.classify_1 && (
                                        <div className="flex mt-3 items-center">
                                            <FormLabel className="text-tbase">Ph??n lo???i h??ng</FormLabel>
                                            <button
                                                type="button"
                                                className="btn ml-4 border-dashed border-[1px] border-primary
                                                         text-primary hover:bg-slate-100
                                                            transition-all duration-300 !px-[30px] py-[6px] !text-sm !md:text-lg"
                                                onClick={() => {
                                                    setActiceAttribute({
                                                        ...activeAttribute,
                                                        classify_1: true,
                                                    });
                                                    setValue('isClassify_1', true);
                                                }}
                                            >
                                                Th??m m??u s???c
                                            </button>
                                        </div>
                                    )}

                                    <div className="attribute-product flex items-start md:flex-row flex-col flex-wrap my-8 grid-cols-2">
                                        {/* CLASSIFY -- 1 */}
                                        {activeAttribute.classify_1 && (
                                            <div className="classify_1 text-center flex md:flex-row flex-col flex-wrap !h-fit my-5 md:my-0 col-span-1">
                                                <FormLabel className="text-xl">M??u s???c</FormLabel>
                                                <div className="box relative w-[100%] bg-white px-5 py-5 rounded-md shadow-md border-t">
                                                    <div
                                                        className="hide-attribute absolute top-0 right-0 cursor-pointer p-1 rounded-md"
                                                        onClick={() => {
                                                            setActiceAttribute({
                                                                ...activeAttribute,
                                                                classify_1: false,
                                                            });
                                                            setValue('isClassify_1', false);
                                                        }}
                                                    >
                                                        <IoCloseOutline className="text-lg" />
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <FormLabel className="text-sm">T??n nh??m ph??n lo???i</FormLabel>
                                                        <InputField
                                                            name="name_classify_1"
                                                            className="my-3"
                                                            control={control}
                                                            error={errors}
                                                        />
                                                    </div> */}

                                                    <div className="form-array">
                                                        <FormLabel className="text-sm">
                                                            Ph??n lo???i h??ng (M??u s???c)
                                                        </FormLabel>
                                                        <FieldColorPicker
                                                            control={control}
                                                            name="classify_1"
                                                            setValue={setValue}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* CLASSIFY -- 2 */}
                                        {activeAttribute.classify_2 && (
                                            <div className="classify_2 text-center lg:mx-5 my-5 lg:my-0 flex md:flex-row flex-col flex-wrap !h-fit col-span-1">
                                                <FormLabel className="text-xl">K??ch th?????c</FormLabel>
                                                <div className="box relative  w-[100%] bg-white px-5 py-5 rounded-md shadow-md border-t">
                                                    <div
                                                        className="hide-attribute absolute top-0 right-0 cursor-pointer p-1 rounded-md"
                                                        onClick={() => {
                                                            setActiceAttribute({
                                                                ...activeAttribute,
                                                                classify_2: false,
                                                            });
                                                            setValue('isClassify_2', false);
                                                        }}
                                                    >
                                                        <IoCloseOutline className="text-lg" />
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <FormLabel className="text-sm">T??n nh??m ph??n lo???i</FormLabel>
                                                        <InputField
                                                            name="name_classify_2"
                                                            className="my-3"
                                                            control={control}
                                                            error={errors}
                                                        />
                                                    </div> */}

                                                    <div className="form-array">
                                                        <FormLabel className="text-sm">
                                                            Ph??n lo???i h??ng (k??ch th?????c)
                                                        </FormLabel>

                                                        <FieldSize
                                                            control={control}
                                                            error={errors}
                                                            name="classify_2"
                                                            placeholder="VD: S, M, L, XL"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {activeAttribute.classify_1 && !activeAttribute.classify_2 && (
                                        <div className="flex mt-3 items-center">
                                            <button
                                                type="button"
                                                className="btn ml-4 border-dashed border-[1px] border-primary
                                                         text-primary hover:bg-slate-100
                                                            transition-all duration-300 !px-[30px] py-[6px] !text-sm !md:text-lg"
                                                onClick={() => {
                                                    setActiceAttribute({
                                                        ...activeAttribute,
                                                        classify_2: true,
                                                    });
                                                    setValue('isClassify_2', true);
                                                }}
                                            >
                                                Th??m k??ch th?????c
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {activeAttribute.classify_1 && (
                                    <div className="variable-table grid lg:grid-cols-3">
                                        <div className="form col-span-2 md:rounded-lg card !rounded-none !w-full text-base overflow-x-auto shadow-xl  p-5 my-5 border-t-[5px]">
                                            <FieldArrayTable control={control} error={errors} setValue={setValue} />
                                        </div>
                                    </div>
                                )}

                                {/* IMAGE UPLOAD FOLLOW CLASSIFY */}
                                {/* <div className="image-upload-attribute flex gap-6 items-center flex-wrap mt-10">
                                                {activeAttribute.classify_1 && (
                                                    <>
                                                        <FormLabel> {formik.values.name_classify_1 || 'T??n'}</FormLabel>
                                                        {formik.values.classify_1.length >= 1 &&
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
                                            </div> */}

                                {/* FIELD PRICE & WAREHOUSE WHEN NO ATTR */}
                                {!activeAttribute.classify_1 && (
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <InputField
                                            type="number"
                                            name="price"
                                            label="Gi??"
                                            error={errors}
                                            control={control}
                                        />
                                        <InputField
                                            type="number"
                                            name="quantity"
                                            label="Kho h??ng"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                )}

                                {/* End --- Price & Warehouse */}
                                <div className="form-group mt-3">
                                    <FormLabel>Tr???ng th??i</FormLabel>
                                    <div className=" flex gap-2">
                                        <RadioField
                                            label="Hi???n"
                                            name="status"
                                            value={1}
                                            id="status-3"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="???n"
                                            name="status"
                                            value={2}
                                            id="status-4"
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
                                        loadingText="??ang th??m..."
                                    >
                                        Th??m s???n ph???m
                                    </Button>
                                    <Button type="button" className="mx-2" onClick={() => Navigate('/product')}>
                                        Quay l???i
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddProduct;
