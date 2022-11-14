import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import CategoryService from '~/services/CategoryService';

const ListProduct = () => {
    const [category, setCategory] = useState();
    // END STATE
    const handleDelete = (id: string | any) => {
        console.log('delete', id);
    };

    const getAllCategory = () => {
        CategoryService.getAllCategory().then((res: any) => {
            if (res.statusCode === 200) {
                setCategory(res.data);
            }
        });
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div>
            <Breadcrumb currentPage="Danh sách danh mục" currentLink="category/list-category" parentPage="Danh mục" />

            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Tên danh mục</Th>
                                        <Th>Danh mục phụ</Th>
                                        <Th>Trạng thái</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {[1, 2, 3, 4].map((data, index: any) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>Áo</Td>
                                            <Td>Áo khoác</Td>
                                            <Td>Hiển thị</Td>
                                            <Td className="flex">
                                                <span className="bg-primary btn mr-2 text-white">
                                                    <AiFillEdit className="text-lg" />
                                                </span>
                                                <span className="bg-red-500 btn text-white ">
                                                    <ModalConfirm handleConfirm={handleDelete}>
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
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
