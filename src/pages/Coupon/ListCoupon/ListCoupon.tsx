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
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoIosEye } from 'react-icons/io';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CouponService from '~/services/CouponService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';

const ListCoupon = () => {
    const [couponList, setCouponList] = useState([]);
    const [couponDetail, setCouponDetail] = useState<any>({});
    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);

    // END STATE
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Navigate = useNavigate();
    const toast = useToast();
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);

    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        getCoupons(selected);
    };
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
                getCoupons(pageNumber);
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

    const getCoupons = (page: number = 0) => {
        setLoading(true);
        CouponService.getCoupons(page).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setLoading(false);

                    setTotalCount(res.data.total);
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
            <Breadcrumb currentPage="Danh sách danh mục" parentLink="category/list-category" parentPage="Danh mục" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full">
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>Mã giảm giá</Th>
                                                <Th>Tiền giảm</Th>
                                                <Th>Số lượng</Th>
                                                <Th>Ngày bắt đầu</Th>
                                                <Th>Ngày kết thúc</Th>
                                                <Th>Trạng thái</Th>
                                                <Th>Hành động</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {couponList?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{item.code}</Td>
                                                    <Td>{FormatPriceVND(item.discount)}</Td>
                                                    <Td>{item.quantity}</Td>
                                                    <Td>{item.start_date}</Td>
                                                    <Td>{item.expirate_date}</Td>
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
                                                                onClick={() =>
                                                                    Navigate('/coupon/update-coupon/' + item.id)
                                                                }
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
                                    {couponList?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Không tồn tại thông tin nào
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
