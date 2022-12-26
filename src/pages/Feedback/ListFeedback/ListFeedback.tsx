import {
    Button,
    FormLabel,
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
import { useForm } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoIosEye } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Rate from '~/components/Rate';
import Config from '~/config';
import { RadioField } from '~/layouts/components/CustomField';
import RatingService from '~/services/FeedbackService';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';
type updateRole = {
    status: number;
};

const initValues = {
    status: 2,
};

const ListFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedback, setFeedback] = useState<any>([]);
    const [idFeedback, setIdFeedback] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    // END STATE
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
    const toast = useToast();
    const Navigate = useNavigate();

    // INIT FORM
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<updateRole>({ defaultValues: initValues });

    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        getAllFeedback(selected);
    };

    const getAllFeedback = (page: number) => {
        setLoading(true);
        RatingService.GetRatings(page).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setFeedbacks(res.data.data);
                setTotalCount(res.data.total);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const getOneFeedback = (id: number) => {
        setLoadingModal(true);
        RatingService.GetRating(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setFeedback(res.data);
                setValue('status', res.data.status);
                setLoadingModal(false);
            } else {
                setLoadingModal(false);
            }
        });
    };

    useEffect(() => {
        getAllFeedback(0);
    }, []);

    const onOpenUpdate = (id: number) => {
        setIdFeedback(id);
        getOneFeedback(id);
        onOpen();
    };

    const openModalView = (id: number) => {
        onOpenView();
        getOneFeedback(id);
    };

    const onSubmitUpdate = (values: updateRole) => {
        const dataPost = {
            status: +values.status,
        };

        RatingService.UpdateRating(idFeedback, dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thành công',
                    status: 'success',
                    duration: 2000,
                });
                getAllFeedback(pageNumber);
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thất bại',
                    status: 'error',
                    duration: 2000,
                });
                onClose();
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách đánh giá" parentLink="feedback" parentPage="Đánh giá" />
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
                                            <Th>Người đánh giá</Th>
                                            <Th>Nội dung</Th>
                                            <Th>Số sao</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Hành động</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {feedbacks?.map((item: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    {item?.user?.first_name} {item?.user?.last_name}
                                                </Td>
                                                <Td>{subString(item?.content, 60)}</Td>
                                                <Td>
                                                    <Rate average={item?.rating} className="flex gap-2" />
                                                </Td>
                                                <Td>
                                                    {item?.status === 1 ? (
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
                                                            onClick={() => onOpenUpdate(item?.id)}
                                                        >
                                                            <AiFillEdit className="text-lg" />
                                                        </Button>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                {feedbacks?.length === 0 && (
                                    <p className="text-xl font-semibold text-center my-5">
                                        Không tồn tại thông tin nào
                                        <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                    </p>
                                )}
                            </div>
                        </div>
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
                </div>
            </div>
            {/* MODAL UPDATE ROLE */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cập nhật trạng thái</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loadingModal ? (
                            <LoadingSpin />
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                                <div className="form-group mt-3">
                                    <FormLabel>Trạng thái</FormLabel>
                                    <div className="flex gap-2">
                                        <RadioField
                                            label="Hiện"
                                            name="status"
                                            value="1"
                                            id="status-1"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="Ẩn"
                                            name="status"
                                            value="2"
                                            id="status-2"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <ModalFooter>
                                    <Button type="button" colorScheme="blue" mr={3} onClick={onClose}>
                                        Đóng
                                    </Button>
                                    <Button variant="ghost" type="submit">
                                        Cập nhật
                                    </Button>
                                </ModalFooter>
                            </form>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* MODAL VIEW DETAIL */}
            <Modal isOpen={isOpenView} onClose={onCloseView} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    {loadingModal ? (
                        <LoadingSpin />
                    ) : (
                        <>
                            <ModalCloseButton />
                            <ModalHeader>Chi tiết đánh giá</ModalHeader>
                            <ModalBody>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th whiteSpace="nowrap">Người đánh giá:</Th>
                                            <Td>
                                                {feedback?.user?.first_name} {feedback?.user?.last_name}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Email:</Th>
                                            <Td>{feedback?.user?.email}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Nội dung:</Th>
                                            <Td wordBreak={'break-all'} whiteSpace="normal">
                                                {feedback?.content}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Sản phẩm:</Th>
                                            <Td wordBreak={'break-all'} whiteSpace="normal">
                                                {feedback?.product?.name}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Trạng thái</Th>
                                            <Td>
                                                {feedback?.status === 1 ? (
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
                                <Button colorScheme="blue" mr={3} onClick={onCloseView}>
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

export default ListFeedback;
