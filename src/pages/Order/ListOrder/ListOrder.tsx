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
    Select,
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
import { IoClose } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import BrandService from '~/services/BrandService';
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

const PER_PAGE = 10;

const ListOrder = () => {
    const [brand, setBrand] = useState([]);
    const [idBrand, setIdBrand] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    // END STATE
    const totalPage = Math.ceil(totalCount / PER_PAGE);

    const toast = useToast();
    const Navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePageChange = ({ selected }: any) => {
        getAllBrands(selected);
        setPageNumber(selected);
    };

    const handleDelete = (id: string | any) => {
        BrandService.DeleteBrand(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Xóa thành công',
                    duration: 2000,
                    status: 'success',
                });
                getAllBrands(pageNumber);
            } else {
                toast({
                    position: 'top-right',
                    title: 'Xóa thất bại',
                    duration: 2000,
                    status: 'error',
                });
            }
        });
    };

    const getAllBrands = (page: number) => {
        BrandService.GetBrands(page).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    if (res.data.total) {
                        setTotalCount(res.data.total);
                    }
                    setBrand(res.data.data);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getBrand();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idBrand]);

    const getBrand = () => {
        if (idBrand > 0) {
            BrandService.GetBrand(idBrand).then((res: ResponseType) => {
                console.log(res);
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

        BrandService.UpdateBrand(idBrand, dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thành công',
                    duration: 2000,
                    status: 'success',
                });
                getAllBrands(pageNumber);
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thất bại',
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
        getAllBrands(0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách danh mục" currentLink="category/list-category" parentPage="Danh mục" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <div className="status-order flex justify-end flex-col items-end mb-3">
                                <div className="w-full md:w-[350px]">
                                    <Select placeholder="Trạng thái giao hàng">
                                        <option value="option1">Chưa xử lý</option>
                                        <option value="option2">Đang xử lý</option>
                                        <option value="option3">Đang giao hàng</option>
                                        <option value="option3">Thành công</option>
                                        <option value="option3">Hủy</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="status-order w-[200px]"></div>
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Mã đơn hàng</Th>
                                        <Th>Ngày đặt</Th>
                                        <Th>Người đặt</Th>
                                        <Th>Trạng thái</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {brand?.map((item: any, index: number) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>
                                                {item.status === 1 ? (
                                                    <span className="badge-status">Hiện</span>
                                                ) : (
                                                    <span className="badge-status !bg-red-500">Ẩn</span>
                                                )}
                                            </Td>
                                            <Td className="flex">
                                                <div className="flex">
                                                    <Button
                                                        p={1}
                                                        colorScheme="twitter"
                                                        className="mx-2"
                                                        onClick={() => {
                                                            Navigate('/order/' + item.id);
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
                    <ModalHeader>Cập nhật thương hiệu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(submitUpdateBrand)}>
                            <div className="form-group grid gird-cols-1 gap-2">
                                <div className="col-span-1">
                                    <InputField name="name" label="Tên thương hiệu" control={control} error={errors} />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <FormLabel>Trạng thái</FormLabel>
                                <div className=" flex gap-2">
                                    <RadioField
                                        label="Hiển thị"
                                        name="status"
                                        value={1}
                                        id="status-3"
                                        control={control}
                                        error={errors}
                                    />
                                    <RadioField
                                        label="Ẩn"
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
                                    Đóng
                                </Button>
                                <Button variant="ghost" type="submit">
                                    Cập nhật
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default ListOrder;
