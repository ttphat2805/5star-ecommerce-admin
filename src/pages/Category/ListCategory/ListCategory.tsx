import { Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';
import { motion } from 'framer-motion';
import { Badge } from '@chakra-ui/react';
import { IoIosEye } from 'react-icons/io';
import { CategoryType } from '~/utils/Types';
import { useNavigate } from 'react-router-dom';
const ListCategory = () => {
    const [category, setCategory] = useState([]);
    const toast = useToast();
    const Navigate = useNavigate();
    // END STATE
    const handleDeleteCategory = (id: string | any) => {
        CategoryService.deleteCategory(id).then(
            (res: any) => {
                if (res.statusCode === 200) {
                    toast({
                        position: 'top-right',
                        title: 'Xóa danh mục thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    getAllCategory();
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const getAllCategory = () => {
        CategoryService.getCategoryParent().then((res: any) => {
            if (res) {
                setCategory(res);
            }
        });
    };

    useEffect(() => {
        getAllCategory();
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
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Danh mục</Th>
                                        <Th>Danh mục phụ</Th>
                                        <Th>Trạng thái</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {category.map((item: any, index: number) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>
                                                {item?.sub_category.map((sub: CategoryType, index: number) => (
                                                    <p key={index} className="my-[2px">
                                                        {sub.name}
                                                    </p>
                                                ))}
                                                {item?.sub_category.length === 0 && <Badge p={1}>Không có</Badge>}
                                            </Td>
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
                                                        onClick={() => Navigate(`/category/edit-category/${item.id}`)}
                                                    >
                                                        <AiFillEdit className="text-lg" />
                                                    </Button>
                                                    <ModalConfirm handleConfirm={() => handleDeleteCategory(item.id)}>
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
        </motion.div>
    );
};

export default ListCategory;
