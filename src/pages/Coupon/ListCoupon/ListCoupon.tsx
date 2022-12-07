import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
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
import { AiFillEdit } from 'react-icons/ai';
import { IoIosEye } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CouponService from '~/services/CouponService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';

const ListCoupon = () => {
    const [couponList, setCouponList] = useState([]);
    const [couponDetail, setCouponDetail] = useState<any>({});
    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    // END STATE
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Navigate = useNavigate();
    const toast = useToast();

    const handleDelete = (id: string | any) => {
        setLoadingModal(true);

        CouponService.deleteCoupon(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Xóa thành công',
                    duration: 2000,
                    status: 'success',
                });
                getCoupons();
                setLoadingModal(false);
            } else {
                toast({
                    position: 'top-right',
                    title: 'Xóa thất bại',
                    duration: 2000,
                    status: 'error',
                });
                setLoadingModal(false);
            }
        });
    };

    const openModalView = (id: number) => {
        getCoupon(id);
        onOpen();
    };

    const getCoupon = (id: number) => {
        setLoadingModal(true);
        CouponService.getCoupon(id).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setCouponDetail(res.data);
                    setLoadingModal(false);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const getCoupons = () => {
        setLoading(true);
        CouponService.getCoupons().then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setLoading(false);

                    setCouponList(res.data.data);
                } else {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getCoupons();
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
                    {loading ? (
                        <LoadingSpin />
                    ) : (
                        <div className="w-full grid grid-cols-1">
                            <div className="form card text-base overflow-x-auto">
                                <Table className="w-full">
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Mã giảm giá</Th>
                                            <Th>Tiền giảm</Th>
                                            <Th>Số lượng</Th>
                                            <Th>Ngày bắt đầu</Th>
                                            <Th>Ngày kết thúc</Th>
                                            <Th>Đã dùng</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Hành động</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {couponList.map((item: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{item.code}</Td>
                                                <Td>{FormatPriceVND(item.discount)}</Td>
                                                <Td>{item.quantity}</Td>
                                                <Td>{item.start_date}</Td>
                                                <Td>{item.expirate_date}</Td>
                                                <Td>{item.used}</Td>
                                                <Td>
                                                    {item.status === 1 ? (
                                                        <span className="badge-status">Hiện</span>
                                                    ) : (
                                                        <span className="badge-status !bg-red-500">Ẩn</span>
                                                    )}
                                                </Td>
                                                <Td className="flex">
                                                    <span
                                                        className="bg-cyan-500 btn mr-2 text-white"
                                                        onClick={() => openModalView(item.id)}
                                                    >
                                                        <IoIosEye className="text-lg" />
                                                    </span>
                                                    <span
                                                        className="bg-primary btn mr-2 text-white"
                                                        onClick={() => Navigate('/coupon/update-coupon/' + item.id)}
                                                    >
                                                        <AiFillEdit className="text-lg" />
                                                    </span>
                                                    <span className="bg-red-500 btn text-white ">
                                                        <ModalConfirm handleConfirm={() => handleDelete(item.id)}>
                                                            <IoClose className="text-lg" />
                                                        </ModalConfirm>
                                                    </span>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* MODAL VIEW DETAIL */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    {loadingModal ? (
                        <LoadingSpin />
                    ) : (
                        <>
                            <ModalHeader>
                                Chi tiết mã: <b>{couponDetail?.code}</b>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th>Mã giảm giá</Th>
                                            <Td>{couponDetail?.code}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Tiền giảm</Th>
                                            <Td>{FormatPriceVND(couponDetail?.discount || 0)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Số lượng</Th>
                                            <Td>{couponDetail?.quantity}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Ngày bắt đầu</Th>
                                            <Td>{couponDetail?.start_date}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Ngày kết thúc</Th>
                                            <Td>{couponDetail?.expirate_date}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Đã dùng</Th>
                                            <Td>{couponDetail?.used}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Đơn hàng tối thiểu</Th>
                                            <Td>{FormatPriceVND(couponDetail?.min_order || 0)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Đơn hàng tối đa</Th>
                                            <Td>{FormatPriceVND(couponDetail?.max_order || 0)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Trạng thái</Th>
                                            <Td>
                                                {couponDetail?.status === 1 ? (
                                                    <span className="badge-status">Hiện</span>
                                                ) : (
                                                    <span className="badge-status !bg-red-500">Ẩn</span>
                                                )}
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
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

export default ListCoupon;
