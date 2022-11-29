import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import { motion } from 'framer-motion';
import UserService from '~/services/UserSerivce';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const ListUser = () => {
    const [users, setUsers] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const Navigate = useNavigate();
    // END STATE
    const handleDelete = (id: string | any) => {
        console.log('delete', id);
    };

    const GetAllUsers = () => {
        UserService.GetUsers().then((res: any) => {
            console.log(res);

            if (res.statusCode === 200) {
                setUsers(res.data.profiles);
            }
        });
    };
    useEffect(() => {
        GetAllUsers();
    }, []);

    const handleDeleteUser = (id: number) => {};

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách danh mục" currentLink="category/list-category" parentPage="Danh mục" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Họ tên</Th>
                                        <Th>Email</Th>
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
                                                        colorScheme="twitter"
                                                        className="mx-2"
                                                        onClick={onOpen}
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
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default ListUser;
