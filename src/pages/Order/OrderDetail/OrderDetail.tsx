import { Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsTruck } from 'react-icons/bs';
import { MdOutlineHail, MdShoppingCart, MdSwapHoriz } from 'react-icons/md';
import Breadcrumb from '~/components/Breadcrumb';
import './OrderDetail.scss';
const OrderDetail = () => {
    const [status, setStatus] = useState<number>(1);
    // END STATE

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('value: ', e.target.value);
        setStatus(Number(e.target.value));
    };
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
                                Order: #36648
                                <span className="flex items-center">
                                    - Đã thanh toán
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
                                                    <Td fontWeight="bold">Nguyễn Văn A </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td width={20}>Email: </Td>
                                                    <Td fontWeight="bold">nguyenvanA@gmail.com </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Số điện thoại: </Td>
                                                    <Td fontWeight="bold">012345678</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Địa chỉ: </Td>
                                                    <Td fontWeight="bold">Ấp chà cú, huyện cù lao tỉnh đồng tháp</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Ghi chú: </Td>
                                                    <Td fontWeight="bold">Gần bờ kè quận 2</Td>
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
                                                    <Td fontWeight="bold">Nguyễn Văn A </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td width={20}>Email: </Td>
                                                    <Td fontWeight="bold">nguyenvanA@gmail.com </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Số điện thoại: </Td>
                                                    <Td fontWeight="bold">012345678</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Địa chỉ: </Td>
                                                    <Td fontWeight="bold">Ấp chà cú, huyện cù lao tỉnh đồng tháp</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Ghi chú: </Td>
                                                    <Td fontWeight="bold">Gần bờ kè quận 2</Td>
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
                                                <Tr>
                                                    <Td>1</Td>
                                                    <Td>Ảnh</Td>
                                                    <Td>Quần áo tay dài</Td>
                                                    <Td>1</Td>
                                                    <Td>200000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>1</Td>
                                                    <Td>Ảnh</Td>
                                                    <Td>Quần áo tay dài</Td>
                                                    <Td>1</Td>
                                                    <Td>200000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>1</Td>
                                                    <Td>Ảnh</Td>
                                                    <Td>Quần áo tay dài</Td>
                                                    <Td>1</Td>
                                                    <Td>200000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td></Td>
                                                    <Td></Td>
                                                    <Td>
                                                        <p className="text-lg text-primary font-semibold">Tổng tiền</p>
                                                    </Td>
                                                    <Td></Td>
                                                    <Td>
                                                        <p className="text-lg font-semibold">800.000 VND</p>
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
