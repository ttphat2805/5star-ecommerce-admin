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
import { IoIosEye } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import { RadioField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import UserService from '~/services/UserSerivce';
import { ResponseType } from '~/utils/Types';

type updateRole = {
    role: string;
};

const initValues = {
    role: 'user',
};

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState<any>([]);
    const [idUser, setIdUser] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);

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

    const handleDeleteUser = (id: number) => {
        console.log('delete', id);
    };

    const GetAllUsers = () => {
        setLoading(true);
        UserService.GetUsers().then((res: any) => {
            console.log('res: ', res);
            if (res.statusCode === 200) {
                setUsers(res.data.profiles);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const GetOneUser = (id: number) => {
        setLoadingModal(true);
        UserService.GetUser(id).then((res: any) => {
            console.log('res: ', res);
            if (res.statusCode === 200) {
                setUser(res.data);
                let role = res.data.roles[1] === 'admin' ? 'admin' : 'user';
                setValue('role', role);
                setLoadingModal(false);
            } else {
                setLoadingModal(false);
            }
        });
    };

    useEffect(() => {
        GetAllUsers();
    }, []);

    const onOpenUpdate = (id: number) => {
        setIdUser(id);
        GetOneUser(id);
        onOpen();
    };

    const openModalView = (id: number) => {
        onOpenView();
        setIdUser(id);
        GetOneUser(id);
    };

    const onSubmitUpdateRole = (values: updateRole) => {
        UserService.updateRole(values, idUser).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật vai trò thành công',
                    duration: 2000,
                    status: 'success',
                });
                GetAllUsers();
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'Cập nhật vai trò thất bại',
                    duration: 2000,
                    status: 'error',
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
                                            <Th>Họ tên</Th>
                                            <Th>Email</Th>
                                            <Th>Vai trò</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Hành động</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {users.map((item: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    {item.first_name} {item.last_name}
                                                </Td>
                                                <Td>{item.email}</Td>
                                                <Td>
                                                    {item?.roles[1] === 'admin' ? (
                                                        <Badge colorScheme="green">Quản trị</Badge>
                                                    ) : (
                                                        <Badge>Người dùng</Badge>
                                                    )}
                                                </Td>
                                                <Td>
                                                    {item.is_active ? (
                                                        <span className="badge-status">Hoạt động</span>
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
                                                        <ModalConfirm handleConfirm={() => handleDeleteUser(item.id)}>
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* MODAL UPDATE ROLE */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cập nhật thành viên</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loadingModal ? (
                            <LoadingSpin />
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitUpdateRole)}>
                                <div className="form-group mt-3">
                                    <FormLabel>Vai trò</FormLabel>
                                    <div className="flex gap-2">
                                        <RadioField
                                            label="Admin"
                                            name="role"
                                            value="admin"
                                            id="role-1"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="Người dùng"
                                            name="role"
                                            value="user"
                                            id="role-2"
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
            <Modal isOpen={isOpenView} onClose={onCloseView}>
                <ModalOverlay />
                <ModalContent>
                    {loadingModal ? (
                        <LoadingSpin />
                    ) : (
                        <>
                            <ModalHeader>
                                Thành viên:
                                <b>
                                    {user?.last_name} {user?.first_name}
                                </b>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th>Họ tên:</Th>
                                            <Td>
                                                {user?.last_name} {user?.first_name}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Email:</Th>
                                            <Td>{user?.email}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Ngày sinh:</Th>
                                            <Td>{user?.birth_day ? user?.birth_day : <Badge>Không có</Badge>}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Số điện thoại:</Th>
                                            <Td>{user?.phone ? user?.phone : <Badge>Không có</Badge>}</Td>
                                        </Tr>
                                        <Tr>
                                            <Th>Vai trò:</Th>
                                            <Td>
                                                {user?.roles?.length > 0 && user?.roles[1] === 'admin'
                                                    ? 'Quản trị'
                                                    : 'Người dùng'}
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

export default ListUser;
