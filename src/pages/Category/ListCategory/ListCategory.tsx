import { Badge, Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';
import { CategoryType } from '~/utils/Types';
const ListCategory = () => {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);

    const toast = useToast();
    const Navigate = useNavigate();

    const handlePageChange = ({ selected }: any) => {
        // getAllCategory(selected);
        // setPageNumber(selected);
    };

    // END STATE
    const handleDeleteCategory = (id: string | any) => {
        setLoading(true);
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
                    setLoading(false);
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

    const getAllCategory = () => {
        setLoading(true);
        CategoryService.getCategoryParent().then((res: any) => {
            if (res) {
                setCategory(res);
                setLoading(false);
            }
        });
        CategoryService.getCategoryNoParent().then((res: any) => {
            if (res) {
                setSubCategory(res);
                setLoading(false);
            }
        });
    };

    const getListSubCategory = (id: number) => {
        let listSub: any = [];
        subCategory.forEach((item: any) => {
            if (item.parent_id === id) {
                listSub.push(item);
            }
        });

        return listSub;
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
            <Breadcrumb currentPage="Danh sách danh mục" parentLink="category/list-category" parentPage="Danh mục" />
            <div className="list-product ">
                <div className="card rounded-md p-2">
                    <div className="w-full  grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full ">
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
                                            {category?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{item.name}</Td>
                                                    <Td>
                                                        {getListSubCategory(item?.id).map(
                                                            (sub: CategoryType, index: number) => (
                                                                <p
                                                                    key={index}
                                                                    className="bg-slate-500 mb-[4px] w-fit text-white p-1 rounded-md"
                                                                >
                                                                    {sub.name}
                                                                </p>
                                                            ),
                                                        )}

                                                        {getListSubCategory(item?.id).length === 0 && (
                                                            <Badge p={1} borderRadius="6px">
                                                                Không có
                                                            </Badge>
                                                        )}
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
                                                                onClick={() =>
                                                                    Navigate(`/category/edit-category/${item.id}`)
                                                                }
                                                            >
                                                                <AiFillEdit className="text-lg" />
                                                            </Button>
                                                            <ModalConfirm
                                                                handleConfirm={() => handleDeleteCategory(item.id)}
                                                            >
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
                                    {category?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Không tồn tại thông tin nào
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ListCategory;
