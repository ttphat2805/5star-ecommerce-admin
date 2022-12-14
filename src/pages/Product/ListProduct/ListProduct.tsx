import { Button, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';
import { Debounce } from '~/utils/Debouce';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';

const ListProduct = () => {
    const [product, setProduct] = useState<any>([]);
    const [search, setSearch] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [, setPageNumber] = useState<number>(0);

    const toast = useToast();
    const Navigate = useNavigate();

    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);
    const handlePageChange = ({ selected }: any) => {
        getAllProduct(selected);
        setPageNumber(selected);
    };

    const getAllProduct = (page: number = 0, name: string = '') => {
        setLoading(true);
        ProductService.getAllProduct({ page, name }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setTotalCount(res.data.total);
                setProduct(res.data.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);
        getAllProduct(0, value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(Debounce(handleSearch, 1000), []);

    const getAllCategory = () => {
        CategoryService.getAllCategory({}).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setListCategory(res.data.data);
            }
        });
    };

    const getNameCategoryByProduct = (id: number) => {
        let nameCategory;
        listCategory?.forEach((item: any) => {
            if (item.id === id) {
                nameCategory = item.name;
            }
        });
        return nameCategory;
    };

    useEffect(() => {
        getAllCategory();
        getAllProduct();
    }, []);

    const handleDeleteProduct = (id: number) => {};

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh s??ch s???n ph???m" parentLink="list-product" parentPage="S???n ph???m" />
            <div className="list-product">
                <img src={`${Config.apiUrl}upload/3c2c50eed3ee67a441844e217934b126`} alt="" />
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <div className="status-order flex justify-end flex-col items-end mb-3">
                                <div className="w-full md:w-[350px]">
                                    <FormLabel>T??m ki???m:</FormLabel>
                                    <Input onChange={debounceSearch} placeholder="T??m s???n ph???m..." />
                                </div>
                            </div>
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full">
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>T??n s???n ph???m</Th>
                                                <Th>Danh m???c</Th>
                                                <Th>Gi??</Th>
                                                <Th>H??nh ???nh</Th>
                                                <Th>Tr???ng th??i</Th>
                                                <Th>H??nh ?????ng</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {product.length > 0 &&
                                                product?.map((item: any, index: number) => (
                                                    <Tr key={item.id}>
                                                        <Td>{index + 1}</Td>
                                                        <Td>
                                                            {item?.name.length > 40
                                                                ? item?.name.substring(0, 40) + '...'
                                                                : item?.name}
                                                        </Td>
                                                        <Td>{getNameCategoryByProduct(item?.id_category)}</Td>
                                                        <Td>{FormatPriceVND(item?.stocks[0]?.price)}</Td>
                                                        <Td>
                                                            <img
                                                                src={`${Config.apiUrl}upload/${item?.images[0]?.file_name}`}
                                                                alt=""
                                                                className="w-[150px] h-[150px] object-contain"
                                                            />
                                                        </Td>
                                                        <Td>
                                                            {item.status === 1 ? (
                                                                <span className="badge-status">Hi???n</span>
                                                            ) : (
                                                                <span className="badge-status !bg-red-500">???n</span>
                                                            )}
                                                        </Td>
                                                        <Td>
                                                            <div className="flex">
                                                                <Button
                                                                    p={1}
                                                                    colorScheme="twitter"
                                                                    className="mx-2"
                                                                    onClick={() =>
                                                                        Navigate(`/category/edit-category/${item.id}`)
                                                                    }
                                                                >
                                                                    <AiFillEdit className="text-lg" />
                                                                </Button>
                                                                <ModalConfirm
                                                                    handleConfirm={() => handleDeleteProduct(item.id)}
                                                                >
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
                                    {product.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Kh??ng t???n t???i th??ng tin n??o
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
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
        </motion.div>
    );
};

export default ListProduct;
