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
                                        <Th>To convert</Th>
                                        <Th>into</Th>
                                        <Th isNumeric>multiply by</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td className="flex">
                                            <span className="bg-primary btn mr-2">
                                                <FiEdit />
                                            </span>
                                            <span className="bg-red-500 btn">
                                                <IoCloseOutline />
                                            </span>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td className="flex">
                                            <span className="bg-primary btn mr-2">
                                                <FiEdit />
                                            </span>
                                            <span className="bg-red-500 btn">
                                                <IoCloseOutline />
                                            </span>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>yards</Td>
                                        <Td>metres (m)</Td>
                                        <Td isNumeric>0.91444</Td>
                                        <Td className="flex">
                                            <span className="bg-primary btn mr-2">
                                                <FiEdit />
                                            </span>
                                            <span className="bg-red-500 btn">
                                                <ModalConfirm handleDelete={() => handleDelete('1')}>
                                                    <IoCloseOutline />
                                                </ModalConfirm>
                                            </span>
                                        </Td>
                                    </Tr>
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
