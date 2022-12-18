import { Badge, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsTruck } from 'react-icons/bs';
import { MdOutlineHail, MdShoppingCart, MdSwapHoriz } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import Config from '~/config';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';
import './OrderDetail.scss';
const OrderDetail = () => {
    const [status, setStatus] = useState<number>(1);
    const [order, setOrder] = useState<any>();
    // END STATE

    const toast = useToast();
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(Number(e.target.value));
    };

    const getOrder = () => {
        OrderService.GetOrder(Number(id)).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setOrder(res.data);
                setStatus(res.data.status);
            }
        });
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb
                currentPage="Chi tiết đơn hàng"
                currentLink="order/list-order"
                parentPage="Đơn hàng"
                parentLink="order"
            />
            <div className="list-product">
                <div className="card rounded-md p-4">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <h3 className="title-order font-bold text-2xl flex items-center">
                                Order: # {order?.id}
                                <span className="flex items-center">
                                    - {order?.payment_method_id === 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                    <AiOutlineCheckCircle className="ml-2 text-primary" />
                                </span>
                            </h3>
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
                                                {order?.details.map((item: any, index: number) => (
                                                    <Tr>
                                                        <Td>{index + 1}</Td>
                                                        <Td>
                                                            {item?.product_info?.product?.images?.length > 0 && (
                                                                <Image
                                                                    className="w-[120px] h-[120px]"
                                                                    alt="Ảnh"
                                                                    src={`${Config.apiUrl}upload/${item?.product_info?.product?.images[0].file_name}`}
                                                                />
                                                            )}
                                                        </Td>
                                                        <Td>{item?.product_info?.product?.name}</Td>
                                                        <Td>{item?.quantity}</Td>
                                                        <Td>{FormatPriceVND(item?.price || 0)}</Td>
                                                    </Tr>
                                                ))}
                                                <Tr>
                                                    <Td></Td>
                                                    <Td></Td>
                                                    <Td>
                                                        <p className="text-lg text-primary font-semibold">Tổng tiền</p>
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
                                <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                    <p className="text-bold text-xl text-white">Trạng thái đơn hàng</p>
                                </div>
                                <div className="status-order flex justify-end flex-col items-end my-3">
                                    <div className="w-full md:w-[350px]">
                                        <Select placeholder="Trạng thái giao hàng" onChange={(e) => changeStatus(e)}>
                                            <option value="1">Chưa xử lý</option>
                                            <option value="2">Đang xử lý</option>
                                            <option value="3">Đang giao hàng</option>
                                            <option value="4">Thành công</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="steps-tracking flex justify-between px-10 text-center border-t border-slate-200 pt-9">
                                    <div
                                        className={`step-item w-full ${
                                            status === 1 || status === 2 || status === 3 || status === 4 || status === 5
                                                ? 'completed'
                                                : ''
                                        }`}
                                    >
                                        <div className="step-icon-wrap">
                                            <div className="step-icon ">
                                                <MdShoppingCart className="text-4xl inline-block" />
                                            </div>
                                        </div>
                                        <h4 className="text-base font-semibold mt-2 text-tbase">Chưa xử lý</h4>
                                    </div>
                                    <div
                                        className={`step-item w-full ${
                                            status === 2 || status === 3 || status === 4 || status === 5
                                                ? 'completed'
                                                : ''
                                        }`}
                                    >
                                        <div className="step-icon-wrap">
                                            <div className="step-icon ">
                                                <MdSwapHoriz className="text-4xl inline-block" />
                                            </div>
                                        </div>
                                        <h4 className="text-base font-semibold mt-2 text-tbase">Đang xử lý</h4>
                                    </div>
                                    <div
                                        className={`step-item w-full ${
                                            status === 3 || status === 4 || status === 5 ? 'completed' : ''
                                        }`}
                                    >
                                        <div className="step-icon-wrap">
                                            <div className="step-icon ">
                                                <BsTruck className="text-4xl inline-block" />
                                            </div>
                                        </div>
                                        <h4 className="text-base font-semibold mt-2 text-tbase">Đang giao hàng</h4>
                                    </div>
                                    <div
                                        className={`step-item w-full ${
                                            status === 4 || status === 5 ? 'completed' : ''
                                        }`}
                                    >
                                        <div className="step-icon-wrap">
                                            <div className="step-icon ">
                                                <MdOutlineHail className="text-4xl inline-block" />
                                            </div>
                                        </div>
                                        <h4 className="text-base font-semibold mt-2 text-tbase">Thành công</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderDetail;
