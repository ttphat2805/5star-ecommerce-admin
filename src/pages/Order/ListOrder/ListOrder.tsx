import {
    Badge,
    Button,
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
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { IoIosEye, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineHail, MdShoppingCart, MdSwapHoriz } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import BrandService from '~/services/BrandService';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';

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

    console.log('orders: ', orders);
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
            {/* MODAL VIEW DETAIL */}
            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    {loadingModal ? (
                        <LoadingSpin />
                    ) : (
                        <>
                            <ModalHeader>
                                <h3 className="title-order font-bold text-2xl flex items-center">
                                    Order: # {order?.id}
                                    <span className="flex items-center">
                                        - {order?.payment_method_id === 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                        <AiOutlineCheckCircle className="ml-2 text-primary" />
                                    </span>
                                </h3>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div className="w-full grid grid-cols-1">
                                    <div className="form card text-base overflow-x-auto">
                                        <div className="info-user grid grid-cols-2 gap-5 mt-5">
                                            <div className="user-orderer col-span-1 bg-slate-100 rounded-xl overflow-hidden">
                                                <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                                    <p className="text-bold text-xl text-white">Thông tin đặt hàng</p>
                                                </div>
                                                <div className="info-order">
                                                    <Table>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td width={20}>Họ tên: </Td>
                                                                <Td fontWeight="bold">{`${order?.user?.first_name} ${order?.user?.last_name}`}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td width={20}>Email: </Td>
                                                                <Td fontWeight="bold">{order?.user?.email} </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Số điện thoại: </Td>
                                                                <Td fontWeight="bold">
                                                                    {order?.user?.phone ? (
                                                                        order?.user?.phone
                                                                    ) : (
                                                                        <Badge>Chưa cập nhật</Badge>
                                                                    )}
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Địa chỉ: </Td>
                                                                <Td fontWeight="bold">
                                                                    <Badge>Chưa cập nhật</Badge>
                                                                </Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="user-receiver col-span-1 bg-slate-100 rounded-xl overflow-hidden">
                                                <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                                    <p className="text-bold text-xl text-white">Thông tin nhận hàng</p>
                                                </div>
                                                <div className="info-order">
                                                    <Table>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td width={20}>Họ tên: </Td>
                                                                <Td fontWeight="bold">{order?.name}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td width={20}>Phương thức thanh toán: </Td>
                                                                <Td fontWeight="bold">
                                                                    {order?.payment_method_id === 1
                                                                        ? 'Thanh toán khi nhận hàng'
                                                                        : 'VN Pay'}
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Số điện thoại: </Td>
                                                                <Td fontWeight="bold">{order?.phone}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Địa chỉ: </Td>
                                                                <Td fontWeight="bold" whiteSpace={'normal'}>
                                                                    {order?.address}
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Ghi chú: </Td>
                                                                <Td fontWeight="bold">{order?.note}</Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content grid grid-cols-1 mt-5 gap-5">
                                            <div className="list-product col-span-1">
                                                <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                                    <p className="text-bold text-xl text-white">Sản phẩm</p>
                                                </div>
                                                <div className="product px-4 mt-2">
                                                    <Table variant="unstyled" borderBottom="1px solid #cccccc69">
                                                        <Thead>
                                                            <Tr>
                                                                <Th className="!text-base">#</Th>
                                                                <Th className="!text-base">Ảnh</Th>
                                                                <Th className="!text-base">Tên sản phẩm</Th>
                                                                <Th className="!text-base">Số lượng</Th>
                                                                <Th className="!text-base">Giá</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {order?.details?.map((item: any, index: number) => (
                                                                <Tr key={index}>
                                                                    <Td>{index + 1}</Td>
                                                                    <Td>
                                                                        {item?.product_info?.product?.images?.length >
                                                                            0 && (
                                                                            <Image
                                                                                className="w-[150px] h-[120px] object-cover"
                                                                                alt="Ảnh"
                                                                                src={`${Config.apiUrl}upload/${item?.product_info?.product?.images[0].file_name}`}
                                                                            />
                                                                        )}
                                                                    </Td>
                                                                    <Td>
                                                                        {subString(
                                                                            item?.product_info?.product?.name,
                                                                            40,
                                                                        )}
                                                                    </Td>
                                                                    <Td>{`${item?.quantity} x ${FormatPriceVND(
                                                                        item?.price || 0,
                                                                    )}`}</Td>
                                                                    <Td>
                                                                        {FormatPriceVND(
                                                                            item?.price * item?.quantity || 0,
                                                                        )}
                                                                    </Td>
                                                                </Tr>
                                                            ))}
                                                            <Tr>
                                                                <Td></Td>
                                                                <Td></Td>
                                                                <Td>
                                                                    <p className="text-lg text-primary font-semibold">
                                                                        Tổng tiền
                                                                    </p>
                                                                </Td>
                                                                <Td></Td>
                                                                <Td>
                                                                    <p className="text-lg font-semibold">
                                                                        {FormatPriceVND(order?.total || 0)}
                                                                    </p>
                                                                </Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tracking grid grid-cols-1 mt-6">
                                            <div className="steps-tracking flex justify-between px-10 text-center border-t border-slate-200 pt-9">
                                                <div
                                                    className={`step-item w-full ${
                                                        order?.status === 1 ||
                                                        order?.status === 2 ||
                                                        order?.status === 3 ||
                                                        order?.status === 4 ||
                                                        order?.status === 5
                                                            ? 'completed'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="step-icon-wrap">
                                                        <div className="step-icon bg-red-500">
                                                            <MdShoppingCart className="text-4xl inline-block" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-base font-semibold mt-2 text-tbase">
                                                        Chưa xử lý
                                                    </h4>
                                                </div>
                                                <div
                                                    className={`step-item w-full ${
                                                        order?.status === 2 ||
                                                        order?.status === 3 ||
                                                        order?.status === 4 ||
                                                        order?.status === 5
                                                            ? 'completed'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="step-icon-wrap">
                                                        <div className="step-icon bg-yellow-500">
                                                            <MdSwapHoriz className="text-4xl inline-block" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-base font-semibold mt-2 text-tbase">
                                                        Đang xử lý
                                                    </h4>
                                                </div>
                                                <div
                                                    className={`step-item w-full ${
                                                        order?.status === 3 ||
                                                        order?.status === 4 ||
                                                        order?.status === 5
                                                            ? 'completed'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="step-icon-wrap">
                                                        <div className="step-icon bg-blue-500">
                                                            <BsTruck className="text-4xl inline-block" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-base font-semibold mt-2 text-tbase">
                                                        Đang giao hàng
                                                    </h4>
                                                </div>
                                                <div
                                                    className={`step-item w-full ${
                                                        order?.status === 4 || order?.status === 5 ? 'completed' : ''
                                                    }`}
                                                >
                                                    <div className="step-icon-wrap">
                                                        <div className="step-icon bg-green-500">
                                                            <MdOutlineHail className="text-4xl inline-block" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-base font-semibold mt-2 text-tbase">
                                                        Thành công
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default ListOrder;
