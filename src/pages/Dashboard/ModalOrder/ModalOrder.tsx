import { Badge, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import moment from 'moment';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
const ModalOrder = ({ getOrderProcess, orderProcess, loadingModal }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Navigate = useNavigate();
    let totalCount = orderProcess?.total;
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);

    const handlePageChange = ({ selected }: any) => {
        getOrderProcess(selected);
    };
    const handleOpenModal = () => {
        getOrderProcess();
        onOpen();
    };

    return (
        <>
            <Button className="!w-full" colorScheme={'red'} onClick={handleOpenModal}>
                {orderProcess?.total} Đơn hàng mới chưa xử lý
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đơn hàng chưa xử lý</ModalHeader>
                    <ModalCloseButton />
                    {loadingModal ? (
                        <LoadingSpin />
                    ) : (
                        <ModalBody>
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
                                    {orderProcess?.data?.length > 0 &&
                                        orderProcess?.data?.map((item: any, index: number) => (
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
                                                        colorScheme="red"
                                                    >
                                                        Chưa xử lý
                                                    </Badge>
                                                </Td>
                                                <Td className="flex">
                                                    <div className="flex">
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
                                                        {/* {item?.status === 5 && (
                                                                    <ModalConfirm
                                                                        handleConfirm={() => handleDelete(item.id)}
                                                                    >
                                                                        <Button p={1} colorScheme="red">
                                                                            <IoClose className="text-lg" />
                                                                        </Button>
                                                                    </ModalConfirm>
                                                                )} */}
                                                    </div>
                                                </Td>
                                            </Tr>
                                        ))}
                                </Tbody>
                            </Table>
                            {orderProcess?.data?.length === 0 && (
                                <p className="text-xl font-semibold text-center my-5">
                                    Không tồn tại thông tin nào
                                    <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                </p>
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
                        </ModalBody>
                    )}

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalOrder;
