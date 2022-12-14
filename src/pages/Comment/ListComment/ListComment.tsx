import {
    Badge,
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
import Config from '~/config';
import { RadioField } from '~/layouts/components/CustomField';
import CommentService from '~/services/CommentService';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';

type updateRole = {
    status: number;
};

const initValues = {
    status: 2,
};

const ListComment = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState<any>([]);
    const [idComment, setIdComment] = useState<number>(0);
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

    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        getAllComment(selected);
    };

    // INIT FORM
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<updateRole>({ defaultValues: initValues });

    const getAllComment = (page: number) => {
        setLoading(true);
        CommentService.GetComments(page).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setComments(res.data.data);
                setTotalCount(res.data.total);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const getOneComment = (id: number) => {
        setLoadingModal(true);
        CommentService.GetComment(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setComment(res.data);
                setValue('status', res?.data?.status);
                setLoadingModal(false);
            } else {
                setLoadingModal(false);
            }
        });
    };

    useEffect(() => {
        getAllComment(0);
    }, []);

    const onOpenUpdate = (id: number) => {
        setIdComment(id);
        getOneComment(id);
        onOpen();
    };

    const openModalView = (id: number) => {
        onOpenView();
        setIdComment(id);
        getOneComment(id);
    };

    const onSubmitUpdate = (values: updateRole) => {
        const dataPost = {
            status: +values.status,
        };
        CommentService.UpdateComment(idComment, dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'C???p nh???t th??nh c??ng',
                    status: 'success',
                    duration: 2000,
                });
                getAllComment(pageNumber);
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'C???p nh???t th???t b???i',
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
            <Breadcrumb currentPage="Danh s??ch b??nh lu???n" parentLink="comment" parentPage="B??nh lu???n" />
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
                                            <Th>Ng?????i b??nh lu???n</Th>
                                            <Th>N???i dung</Th>
                                            <Th>B??i vi???t</Th>
                                            <Th>Tr???ng th??i</Th>
                                            <Th>H??nh ?????ng</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {comments?.map((item: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    {item?.profile?.first_name} {item?.profile?.last_name}
                                                </Td>
                                                <Td>{subString(item?.body, 60)}</Td>
                                                <Td>{subString(item?.blog?.title, 60)}</Td>
                                                <Td>
                                                    {item.status === 1 ? (
                                                        <span className="badge-status">Hi???n</span>
                                                    ) : (
                                                        <span className="badge-status !bg-red-500">???n</span>
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
                                {comments?.length === 0 && (
                                    <p className="text-xl font-semibold text-center my-5">
                                        Kh??ng t???n t???i th??ng tin n??o
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
                    <ModalHeader>C???p nh???t tr???ng th??i</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loadingModal ? (
                            <LoadingSpin />
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                                <div className="form-group mt-3">
                                    <FormLabel>Tr???ng th??i</FormLabel>
                                    <div className="flex gap-2">
                                        <RadioField
                                            label="Hi???n"
                                            name="status"
                                            value="1"
                                            id="status-1"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="???n"
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
                                        ????ng
                                    </Button>
                                    <Button variant="ghost" type="submit">
                                        C???p nh???t
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
                            <ModalHeader>Chi ti???t b??nh lu???n</ModalHeader>
                            <ModalBody>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th>H??? t??n:</Th>
                                            <Td>
                                                {comment?.profile?.first_name} {comment?.profile?.last_name}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Email:</Th>
                                            <Td>{comment?.profile?.email}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>N???i dung:</Th>
                                            <Td wordBreak={'break-all'} whiteSpace="normal">
                                                {comment?.body}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>B??i vi???t:</Th>
                                            <Td wordBreak={'break-all'} whiteSpace="normal">
                                                {comment?.blog?.title}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>S??? b??nh lu???n tr??? l???i:</Th>
                                            <Td>{comment?.childComment?.length}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={onCloseView}>
                                    ????ng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default ListComment;
