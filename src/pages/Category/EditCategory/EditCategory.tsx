import {
    Button,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';
import { toSlug } from '~/utils/Slug';
import { CategoryType, ResponseType, SubCategoryType } from '~/utils/Types';

const defaultValues = {
    name: '',
    priority: 0,
    status: 0,
};

const defaultValuesSubCate = {
    name_sub: '',
    priority: 0,
    status_sub: 0,
};

const EditProduct = () => {
    const [category, setCategory] = useState<CategoryType>();
    const [idSubCategory, setIdSubCategory] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const Navigate = useNavigate();
    const { slug } = useParams();

    const getCategory = (slug: string | number, type: string) => {
        if (+slug > 0) {
            CategoryService.getOneCategory(String(slug)).then((res: any) => {
                if (res.statusCode === 200) {
                    const { name, status } = res?.data;
                    if (type === 'subCategory') {
                        setValueSubCat('name_sub', name);
                        setValueSubCat('status_sub', status);
                        return;
                    } else {
                        setCategory(res.data);
                        setValue('name', name);
                        setValue('status', status);
                    }
                }
            });
        }
    };

    useEffect(() => {
        getCategory(String(slug), 'category');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCategory(idSubCategory, 'subCategory');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idSubCategory]);

    // INIT FORM CATEGORY MAIN
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CategoryType>({ defaultValues: defaultValues });

    // INIT FORM SUB CATEGORY
    const {
        handleSubmit: handleSubmitSubCat,
        control: controlSubCat,
        setValue: setValueSubCat,
        formState: { errors: errorsSubCat },
    } = useForm<SubCategoryType>({ defaultValues: defaultValuesSubCate });

    const requestUpdateCategory = (id: number, data: CategoryType | SubCategoryType, type: string) => {
        CategoryService.updateCategory(id, data).then((res: any) => {
            if (res.statusCode === 200) {
                if (type === 'subCategory') {
                    getCategory(String(slug), 'category');
                    onClose();
                } else {
                    toast({
                        position: 'top-right',
                        title: 'C???p nh???t danh m???c th??nh c??ng',
                        duration: 2000,
                        status: 'success',
                    });
                    Navigate('/category/list-category');
                }
            }
        });
    };

    const handleDeleteSubCategory = (id: number = 0) => {
        if (id > 0) {
            CategoryService.deleteCategory(id).then(
                (res: ResponseType) => {
                    if (res.statusCode === 200) {
                        toast({
                            position: 'top-right',
                            title: 'X??a danh m???c ph??? th??nh c??ng',
                            duration: 2000,
                            status: 'success',
                        });
                        getCategory(String(slug), 'category');
                    }
                },
                (err) => {
                    toast({
                        position: 'top-right',
                        title: 'X??a danh m???c ph??? th???t b???i',
                        duration: 2000,
                        status: 'error',
                    });
                },
            );
        }
    };

    const handleSubmitForm = (values: CategoryType) => {
        console.log('values: ', values);
        const { name, status, priority } = values;
        let dataCategory = {
            name,
            priority,
            status: Number(status),
            slug: toSlug(name),
        };
        requestUpdateCategory(Number(slug), dataCategory, 'category');
    };

    const submitFormSubCategory = (values: SubCategoryType) => {
        const { name_sub: name, status_sub: status, priority } = values;
        let dataSubCategory = {
            name,
            priority,
            status: Number(status),
            slug: toSlug(name),
        };
        requestUpdateCategory(idSubCategory, dataSubCategory, 'subCategory');
    };
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="C???p nh???t danh m???c" parentLink="list-product" parentPage="Danh m???c" />
            <div className="edit-category">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">C???p nh???t danh m???c</h3>
                            <div className="card text-base p-3">
                                <form onSubmit={handleSubmit(handleSubmitForm)}>
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <div className="col-span-1">
                                            <InputField
                                                name="name"
                                                label="T??n danh m???c"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <div className="col-span-1">
                                            <InputField
                                                type="number"
                                                name="priority"
                                                label="????? ??u ti??n"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <FormLabel>Tr???ng th??i</FormLabel>
                                        <div className=" flex gap-2">
                                            <RadioField
                                                label="Hi???n th???"
                                                name="status"
                                                value={1}
                                                id="status-1"
                                                control={control}
                                                error={errors}
                                            />
                                            <RadioField
                                                label="???n"
                                                name="status"
                                                value={2}
                                                id="status-2"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-table card text-base overflow-x-auto w-full md:w-3/4 mt-3">
                                        <FormLabel>Danh s??ch danh m???c ph???</FormLabel>

                                        {category?.sub_category.length === 0 ? (
                                            <>
                                                <p className="my-2">Kh??ng c?? danh m???c ph??? n??o</p>
                                                <Link to="/category/add-category">
                                                    <Button>
                                                        Th??m danh m???c
                                                        <BsPlus className="text-xl" />
                                                    </Button>
                                                </Link>
                                            </>
                                        ) : (
                                            <Table variant="simple" className="w-full text-center">
                                                <Thead>
                                                    <Tr>
                                                        <Th>#</Th>
                                                        <Th>T??n</Th>
                                                        <Th>???????ng d???n</Th>
                                                        <Th>Tr???ng th??i</Th>
                                                        <Th>H??nh ?????ng</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {category?.sub_category?.map(
                                                        (subCat: CategoryType, index: number) => (
                                                            <Tr key={subCat.id}>
                                                                <Td>{index + 1}</Td>
                                                                <Td>{subCat.name}</Td>
                                                                <Td>{subCat.slug}</Td>
                                                                <Td>
                                                                    {subCat.status === 1 ? (
                                                                        <span className="badge-status">Hi???n</span>
                                                                    ) : (
                                                                        <span className="badge-status !bg-red-500">
                                                                            ???n
                                                                        </span>
                                                                    )}
                                                                </Td>
                                                                <Td>
                                                                    <div className="flex">
                                                                        <Button
                                                                            p={1}
                                                                            colorScheme="twitter"
                                                                            className="mx-2"
                                                                            onClick={() => {
                                                                                onOpen();
                                                                                setIdSubCategory(subCat.id || 0);
                                                                            }}
                                                                        >
                                                                            <AiFillEdit className="text-lg" />
                                                                        </Button>
                                                                        <ModalConfirm
                                                                            handleConfirm={() =>
                                                                                handleDeleteSubCategory(subCat?.id)
                                                                            }
                                                                        >
                                                                            <Button p={1} colorScheme="red">
                                                                                <IoClose className="text-lg" />
                                                                            </Button>
                                                                        </ModalConfirm>
                                                                    </div>
                                                                </Td>
                                                            </Tr>
                                                        ),
                                                    )}
                                                </Tbody>
                                            </Table>
                                        )}
                                    </div>
                                    <div className="btn-action flex items-center justify-center mt-5">
                                        <Button type="submit" colorScheme="twitter">
                                            C???p nh???t
                                        </Button>
                                        <Button
                                            type="button"
                                            className="mx-2"
                                            onClick={() => Navigate('/category/list-category')}
                                        >
                                            Quay l???i
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>C???p nh???t danh m???c ph???</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmitSubCat(submitFormSubCategory)}>
                            <div className="form-group grid gird-cols-1 gap-2">
                                <div className="col-span-1">
                                    <InputField
                                        name="name_sub"
                                        label="T??n danh m???c"
                                        control={controlSubCat}
                                        error={errorsSubCat}
                                    />
                                </div>
                            </div>
                            <div className="form-group grid gird-cols-1 gap-2">
                                <div className="col-span-1">
                                    <InputField
                                        name="priority"
                                        type="number"
                                        label="????? ??u ti??n"
                                        control={controlSubCat}
                                        error={errorsSubCat}
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <FormLabel>Tr???ng th??i</FormLabel>
                                <div className=" flex gap-2">
                                    <RadioField
                                        label="Hi???n th???"
                                        name="status_sub"
                                        value={1}
                                        id="status-3"
                                        control={controlSubCat}
                                        error={errorsSubCat}
                                    />
                                    <RadioField
                                        label="???n"
                                        name="status_sub"
                                        value={2}
                                        id="status-4"
                                        control={controlSubCat}
                                        error={errorsSubCat}
                                    />
                                </div>
                            </div>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                    ????ng
                                </Button>
                                <Button variant="ghost" type="submit">
                                    C???p nh???t
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default EditProduct;
