import { Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';
import ProductService from '~/services/ProductService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';

const ListProduct = () => {
    const [product, setProduct] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);

    const toast = useToast();
    const Navigate = useNavigate();

    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);
    const handlePageChange = ({ selected }: any) => {
        getAllProduct(selected);
        setPageNumber(selected);
    };

    const getAllProduct = (page: number = 0) => {
        setLoading(true);
        ProductService.getAllProduct(page).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                if (res.data.total) {
                    setTotalCount(res.data.total);
                }
                setProduct(res.data.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const getAllCategory = () => {
        CategoryService.getAllCategory().then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setListCategory(res.data[0]);
            }
        });
    };

    const getNameCategoryByProduct = (id: number) => {
        let nameCategory;
        listCategory.forEach((item: any) => {
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
            <Breadcrumb currentPage="Danh sách sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
            <div className="list-product">
                <img src={`${Config.apiUrl}upload/3c2c50eed3ee67a441844e217934b126`} alt="" />
                <div className="card rounded-md p-2">
                    {loading ? (
                        <LoadingSpin />
                    ) : (
                        <div className="w-full grid grid-cols-1">
                            <div className="form card text-base overflow-x-auto">
                                <Table className="w-full">
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Tên sản phẩm</Th>
                                            <Th>Danh mục</Th>
                                            <Th>Giá</Th>
                                            <Th>Hình ảnh</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Hành động</Th>
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
                                                            className="w-3/4 h-[30%]"
                                                        />
                                                    </Td>
                                                    <Td>
                                                        {item.status === 1 ? (
                                                            <span className="badge-status">Hiện</span>
                                                        ) : (
                                                            <span className="badge-status !bg-red-500">Ẩn</span>
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
                            </div>
                        </div>
                    )}
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
