import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import ModalConfirm from '~/layouts/components/ModalConfirm';
const ListProduct = () => {
    const handleDelete = (id: string | any) => {
        console.log('delete', id);
    };

    return (
        <div>
            <Breadcrumb currentPage="Danh sách sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
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
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>Áo</Td>
                                            <Td>Áo khoác</Td>
                                            <Td>Hiển thị</Td>
                                            <Td className="flex">
                                                <span className="bg-primary btn mr-2">
                                                    <FiEdit />
                                                </span>
                                                <span className="bg-red-500 btn">
                                                    <IoCloseOutline />
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
