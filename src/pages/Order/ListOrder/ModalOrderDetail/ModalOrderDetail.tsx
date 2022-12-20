import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Tbody,
    Tr,
    Td,
    Badge,
    Button,
    Th,
    Thead,
} from '@chakra-ui/react';
import LoadingSpin from '~/components/LoadingSpin';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineHail, MdShoppingCart, MdSwapHoriz } from 'react-icons/md';
import { BsTruck } from 'react-icons/bs';
import Config from '~/config';
import { subString } from '~/utils/MinString';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import Image from '~/components/Image';
const ModalOrderDetail = ({ loadingModal, order, isOpen, onClose }: any) => {
    return (
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
                                                                    {subString(item?.product_info?.product?.name, 40)}
                                                                </Td>
                                                                <Td>{`${item?.quantity} x ${FormatPriceVND(
                                                                    item?.price || 0,
                                                                )}`}</Td>
                                                                <Td>
                                                                    {FormatPriceVND(item?.price * item?.quantity || 0)}
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
                                        {order?.status !== 5 && (
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
                                        )}
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
    );
};

export default ModalOrderDetail;
