import { Badge, Button, Select, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsTruck } from 'react-icons/bs';
import { MdOutlineHail, MdOutlineRemoveShoppingCart, MdShoppingCart, MdSwapHoriz } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';
import './OrderDetail.scss';
const OrderDetail = () => {
    const [status, setStatus] = useState<number | string>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<any>();
    // END STATE

    const toast = useToast();
    const { id } = useParams();
    const Navigate = useNavigate();
    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setStatus(Number(value));
        let dataUpdate = {
            status: +value,
        };
        OrderService.UpdateStatusOrder(Number(id), dataUpdate).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                getOrder();
                toast({
                    position: 'top-right',
                    title: 'Cập nhật trạng thái thành công',
                    duration: 2000,
                    status: 'success',
                });
                setStatus(Number(value));
            } else {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật trạng thái thất bại',
                    duration: 2000,
                    status: 'error',
                });
            }
        });
    };

    const getOrder = () => {
        setLoading(true);
        OrderService.GetOrder(Number(id)).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setOrder(res.data);
                setStatus(res.data.status);
                setLoading(false);
            }
        });
    };

    const handleDisiableStatus = (value: number) => {
        switch (value) {
            case 1:
                if (status === 2 || status === 3 || status === 4 || status === 5) {
                    return true;
                }
                break;
            case 2:
                if (status === 3 || status === 4 || status === 5) {
                    return true;
                }
                break;
            case 3:
                if (status === 4 || status === 5) {
                    return true;
                }
                break;
            case 4:
                if (status === 5) {
                    return true;
                }
                break;
            case 5:
                if (status === 4) {
                    return true;
                }
                break;

            default:
                break;
        }
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
            <Breadcrumb currentPage="Chi tiết đơn hàng" parentLink="order" parentPage="Đơn hàng" />
            <div className="list-product">
                <div className="card rounded-md p-4">
                    {loading ? (
                        <LoadingSpin />
                    ) : (
                        <div className="w-full grid grid-cols-1">
                            <div className="form card text-base overflow-x-auto">
                                <h3 className="title-order font-bold text-2xl flex items-center">
                                    Order: # {order?.id}
                                    <span className="flex items-center">
                                        - {order?.payment_method_id === 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                        <AiOutlineCheckCircle className="ml-2 text-primary" />
                                    </span>
                                </h3>
                                <div className="info-user grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                                    <div className="user-orderer col-span-1 bg-slate-100 rounded-xl overflow-hidden">
                                        <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                            <p className="text-bold text-xl text-white">Thông tin đặt hàng</p>
                                        </div>
                                        <div className="info-order overflow-x-auto">
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
                                        <div className="info-order overflow-x-auto">
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
                                        <div className="product px-4 mt-2 overflow-x-auto">
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
                                                        <Tr key={index}>
                                                            <Td>{index + 1}</Td>
                                                            <Td>
                                                                {item?.product_info?.product?.images?.length > 0 && (
                                                                    <Image
                                                                        className="w-[150px] h-[120px] object-cover"
                                                                        alt="Ảnh"
                                                                        src={`${Config.apiUrl}upload/${item?.product_info?.product?.images[0].file_name}`}
                                                                    />
                                                                )}
                                                            </Td>
                                                            <Td>{subString(item?.product_info?.product?.name)}</Td>
                                                            <Td>{`${item?.quantity} x ${FormatPriceVND(
                                                                item?.price || 0,
                                                            )}`}</Td>
                                                            <Td>{FormatPriceVND(item?.price * item?.quantity || 0)}</Td>
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
                                <div className="tracking grid grid-cols-1 mt-6 overflow-x-auto">
                                    <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                        <p className="text-bold text-xl text-white">Trạng thái đơn hàng</p>
                                    </div>
                                    <div className="status-order flex my-5 flex-colmy-3 items-center">
                                        <p className="font-semibold mr-2 text-lg">Cập nhật trạng thái:</p>
                                        <div className="w-full md:w-[350px]">
                                            <Select onChange={(e) => changeStatus(e)} value={status}>
                                                <option hidden>Trạng thái giao hàng</option>
                                                <option value="1" disabled={handleDisiableStatus(1)}>
                                                    Chưa xử lý
                                                </option>
                                                <option value="2" disabled={handleDisiableStatus(2)}>
                                                    Đang xử lý
                                                </option>
                                                <option value="3" disabled={handleDisiableStatus(3)}>
                                                    Đang giao hàng
                                                </option>
                                                <option value="4" disabled={handleDisiableStatus(4)}>
                                                    Thành công
                                                </option>
                                                <option value="5" disabled={handleDisiableStatus(5)}>
                                                    Hủy
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                    {status === 5 ? (
                                        <div className="step-item w-fit ml-5">
                                            <div className="step-icon-wrap text-center">
                                                <div className="step-icon bg-red-500 ">
                                                    <MdOutlineRemoveShoppingCart className="text-4xl inline-block" />
                                                </div>
                                            </div>
                                            <h4 className="text-base font-semibold mt-2 text-tbase text-left">
                                                Đơn hàng đã bị hủy
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="steps-tracking flex flex-col md:flex-row justify-between px-10 text-center border-t border-slate-200 pt-9">
                                            <div className={`step-item w-full completed`}>
                                                <div className="step-icon-wrap ">
                                                    <div className="step-icon bg-red-500">
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
                                                <div className="step-icon-wrap ">
                                                    <div className="step-icon bg-yellow-500">
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
                                                    status === 4 || status === 5 ? 'completed' : ''
                                                }`}
                                            >
                                                <div className="step-icon-wrap">
                                                    <div className="step-icon bg-green-500">
                                                        <MdOutlineHail className="text-4xl inline-block" />
                                                    </div>
                                                </div>
                                                <h4 className="text-base font-semibold mt-2 text-tbase">Thành công</h4>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="btn-action flex items-center justify-center mt-5">
                                <Button type="button" className="mx-2" onClick={() => Navigate('/order')}>
                                    Quay lại
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default OrderDetail;
