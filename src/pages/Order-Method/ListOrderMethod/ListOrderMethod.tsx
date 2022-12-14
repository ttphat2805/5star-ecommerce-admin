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
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import OrderMethodService from '~/services/OrdermethodService';
import { toSlug } from '~/utils/Slug';
import { ResponseType } from '~/utils/Types';

interface brandType {
    name: string;
    id: number;
    slug: string;
    status: number;
}

const defaultValues = {
    name: '',
    slug: '',
    status: 1,
};

const ListOrderMethod = () => {
    const [ordermethod, setOrdermethod] = useState([]);
    const [idOrderMethod, setIdOrderMethod] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    // END STATE
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePageChange = ({ selected }: any) => {
        getAllMethod(selected);
        setPageNumber(selected);
    };

    const handleDelete = (id: string | any) => {
        OrderMethodService.DeleteOrderMethod(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'X??a th??nh c??ng',
                    duration: 2000,
                    status: 'success',
                });
                getAllMethod(pageNumber);
            } else {
                toast({
                    position: 'top-right',
                    title: 'X??a th???t b???i',
                    duration: 2000,
                    status: 'error',
                });
            }
        });
    };

    const getAllMethod = (page: number) => {
        setLoading(true);
        OrderMethodService.GetOrderMethods(page).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setTotalCount(res.data.total);
                    setOrdermethod(res.data.data);
                }
                setLoading(false);
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getOrderMethod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idOrderMethod]);

    const getOrderMethod = () => {
        if (idOrderMethod > 0) {
            OrderMethodService.GetOrderMethod(idOrderMethod).then((res: ResponseType) => {
                if (res.statusCode === 200) {
                    const { name, status } = res?.data;
                    setValue('name', name);
                    setValue('status', status);
                }
            });
        }
    };

    const submitUpdateBrand = (values: brandType) => {
        const { name, status } = values;

        const dataPost = {
            name,
            slug: toSlug(name),
            status: Number(status),
        };

        OrderMethodService.UpdateOrderMethod(idOrderMethod, dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'C???p nh???t th??nh c??ng',
                    duration: 2000,
                    status: 'success',
                });
                getAllMethod(pageNumber);
                onClose();
            } else if (res.message === 'name duplicate') {
                toast({
                    position: 'top-right',
                    title: 'Ph????ng th???c n??y ???? t???n t???i',
                    duration: 2000,
                    status: 'error',
                });
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'C???p nh???t th???t b???i',
                    duration: 2000,
                    status: 'error',
                });
                onClose();
            }
        });
    };

    // INIT FORM UPDATE BRAND
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<brandType>({ defaultValues: defaultValues });

    useEffect(() => {
        getAllMethod(0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb
                currentPage="Danh s??ch ph????ng th???c"
                parentLink="ordermethod"
                parentPage="Ph????ng th???c thanh to??n"
            />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full">
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>T??n th????ng hi???u</Th>
                                                <Th>Tr???ng th??i</Th>
                                                <Th>H??nh ?????ng</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {ordermethod?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{item.name}</Td>
                                                    <Td>
                                                        {item.status === 1 ? (
                                                            <span className="badge-status">Hi???n</span>
                                                        ) : (
                                                            <span className="badge-status !bg-red-500">???n</span>
                                                        )}
                                                    </Td>
                                                    <Td className="flex">
                                                        <div className="flex">
                                                            <Button
                                                                p={1}
                                                                colorScheme="twitter"
                                                                className="mx-2"
                                                                onClick={() => {
                                                                    onOpen();
                                                                    setIdOrderMethod(item.id);
                                                                }}
                                                            >
                                                                <AiFillEdit className="text-lg" />
                                                            </Button>
                                                            <ModalConfirm handleConfirm={() => handleDelete(item.id)}>
                                                                <Button p={1} colorScheme="red">
                                                                    <IoClose className="text-lg" />
                                                                </Button>
                                                            </ModalConfirm>
                                                        </div>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                    {ordermethod?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Kh??ng t???n t???i th??ng tin n??o
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                        {totalPage > 0 && (
                            <div className="pagination-feature flex">
                                <ReactPaginate
                                    previousLabel={<BiChevronLeft className="inline text-xl" />}
                                    nextLabel={<BiChevronRight className="inline text-xl" />}
                                    pageCount={totalPage}
                                    onPageChange={handlePageChange}
                                    activeClassName={'page-item active'}
                                    disabledClassName={'page-item disabled'}
                                    containerClassName={'pagination'}
                                    previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'}
                                    pageLinkClassName={'page-link'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>C???p nh???t th????ng hi???u</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(submitUpdateBrand)}>
                            <div className="form-group grid gird-cols-1 gap-2">
                                <div className="col-span-1">
                                    <InputField name="name" label="T??n th????ng hi???u" control={control} error={errors} />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <FormLabel>Tr???ng th??i</FormLabel>
                                <div className=" flex gap-2">
                                    <RadioField
                                        label="Hi???n th???"
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

export default ListOrderMethod;
