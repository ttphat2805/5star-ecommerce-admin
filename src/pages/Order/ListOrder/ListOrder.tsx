import { Badge, Button, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoIosEye, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import BrandService from '~/services/BrandService';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';
import ModalOrderDetail from './ModalOrderDetail';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [idOrder, setIdOrder] = useState<number>();
    const [order, setOrder] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // END STATE
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);

    const toast = useToast();
    const Navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePageChange = ({ selected }: any) => {
        getAllOrder(selected);
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
                getAllOrder(pageNumber);
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

    const getAllOrder = (page: number) => {
        setLoading(true);
        OrderService.GetOrders(2).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setTotalCount(res.data.total);
                    setOrders(res.data);
                    setLoading(false);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const getOrder = (id: number) => {
        setLoadingModal(true);
        OrderService.GetOrder(id).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setOrder(res.data);
                    setLoadingModal(false);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const openModalView = (id: number) => {
        getOrder(id);
        setIdOrder(id);
        onOpen();
    };

    const handleStatus = (status: number) => {
        let resultStatus: any = { name: '', scheme: '' };
        switch (status) {
            case 1:
                resultStatus.name = 'Chưa xử lý';
                resultStatus.scheme = 'red';
                break;
            case 2:
                resultStatus.name = 'Đang xử lý';
                resultStatus.scheme = 'yellow';
                break;
            case 3:
                resultStatus.name = 'Đang giao hàng';
                resultStatus.scheme = 'blue';
                break;
            case 4:
                resultStatus.name = 'Thành công';
                resultStatus.scheme = 'green';
                break;
            case 5:
                resultStatus.name = 'Hủy';
                resultStatus.scheme = 'red';
                break;
            default:
                resultStatus.name = 'Chưa xử lý';
                resultStatus.scheme = 'red';
                break;
        }
        return resultStatus;
    };

    useEffect(() => {
        getAllOrder(0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách đơn hàng" parentLink="order" parentPage="Đơn hàng" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <div className="status-order flex justify-end flex-col items-end mb-3">
                                <div className="w-full md:w-[350px]">
                                    <Select>
                                        <option hidden>Trạng thái giao hàng</option>
                                        <option value="1">Chưa xử lý</option>
                                        <option value="2">Đang xử lý</option>
                                        <option value="3">Đang giao hàng</option>
                                        <option value="4">Thành công</option>
                                        <option value="5">Hủy</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="status-order w-[200px]"></div>
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full">
                                        <Thead>
                                            <Tr>
                                                <Th>Mã đơn hàng</Th>
                                                <Th>Người đặt</Th>
                                                <Th>Ngày đặt</Th>
                                                <Th>Tổng tiền</Th>
                                                <Th>Thanh toán</Th>
                                                <Th>Trạng thái</Th>
                                                <Th>Hành động</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {orders?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>#{item?.id}</Td>
                                                    <Td>{`${item.user.first_name} ${item.user.last_name}`}</Td>
                                                    <Td>{moment(item.create_at).format('DD-MM-YYYY hh:mm')}</Td>
                                                    <Td>{FormatPriceVND(item?.total)}</Td>
                                                    <Td>{item?.payment_method_id === 1 ? 'COD' : 'VNPAY'}</Td>
                                                    <Td>
                                                        <Badge
                                                            py={2}
                                                            px={3}
                                                            borderRadius="15px !important"
                                                            colorScheme={handleStatus(item?.status).scheme}
                                                        >
                                                            {handleStatus(item?.status).name}
                                                        </Badge>
                                                    </Td>
                                                    <Td className="flex">
                                                        <div className="flex">
                                                            <Button
                                                                p={1}
                                                                colorScheme="cyan"
                                                                className=""
                                                                onClick={() => openModalView(item.id)}
                                                            >
                                                                <IoIosEye className="text-lg text-white" />
                                                            </Button>
                                                            <Button
                                                                p={1}
                                                                colorScheme="twitter"
                                                                className="mx-2"
                                                                onClick={() => {
                                                                    Navigate('/order/' + item.id);
                                                                }}
                                                            >
                                                                <IoMdInformationCircleOutline className="text-lg" />
                                                            </Button>
                                                            {item?.status === 5 && (
                                                                <ModalConfirm
                                                                    handleConfirm={() => handleDelete(item.id)}
                                                                >
                                                                    <Button p={1} colorScheme="red">
                                                                        <IoClose className="text-lg" />
                                                                    </Button>
                                                                </ModalConfirm>
                                                            )}
                                                        </div>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                    {orders?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Không tồn tại thông tin nào
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                        <ModalOrderDetail loadingModal={loadingModal} order={order} isOpen={isOpen} onClose={onClose} />
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

export default ListOrder;
