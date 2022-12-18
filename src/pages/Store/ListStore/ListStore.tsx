import { Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import StoreService from '~/services/StoreService';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';

const PER_PAGE = 10;

const ListStore = () => {
    const [store, setStore] = useState<any>();
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    // END STATE
    const totalPage = Math.ceil(totalCount / PER_PAGE);

    const toast = useToast();
    const Navigate = useNavigate();

    const handlePageChange = ({ selected }: any) => {
        getAllStore(selected);
        setPageNumber(selected);
    };

    const handleDelete = (id: string | any) => {
        StoreService.DeleteStore(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Xóa thành công',
                    duration: 2000,
                    status: 'success',
                });
                getAllStore(pageNumber);
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

    const getAllStore = (page: number) => {
        StoreService.GetStores(page).then(
            (res: ResponseType) => {
                console.log('res: ', res);
                if (res.statusCode === 200) {
                    if (res.data.total) {
                        setTotalCount(res.data.total);
                    }
                    setStore(res.data.data);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getAllStore(0);
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
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Tên cửa hàng</Th>
                                        <Th>Giờ mở cửa</Th>
                                        <Th>Email</Th>
                                        <Th>Ngày mở cửa</Th>
                                        <Th>Trạng thái</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {store?.map((item: any, index: number) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{subString(item?.name)}</Td>
                                            <Td>{item.time}</Td>
                                            <Td>{item.email}</Td>
                                            <Td>{item.open_close}</Td>
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
                                                            Navigate('/store/update-store/' + item.id);
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
        </motion.div>
    );
};

export default ListStore;
