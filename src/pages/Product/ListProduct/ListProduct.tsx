import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';

const ListProduct = () => {
    const [product, setProduct] = useState();

    const getAllProduct = () => {};

    return (
        <div className="fade-up">
            <Breadcrumb currentPage="Danh sách sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <Table className="w-full">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Tên sản phẩm</Th>
                                        <Th>Danh mục</Th>
                                        <Th>Giá</Th>
                                        <Th>Hình ảnh</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {[1, 2, 3, 4, 5].map((data, index: any) => (
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>Áo khoác mùa đông</Td>
                                            <Td>Áo khoác</Td>
                                            <Td>299.000 VNĐ</Td>
                                            <Td>
                                                <Image
                                                    src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPU5FJd5J9DPzYnlDdyDy5XoBtlmFARTn2fFoiBHOBk4y-WemUEx4SJWBuAdy4DRvZ_Nmj8Ylm8BK-_yRT-ttPb2XLOur9QeV0ril5djz3t4LqBfGrlDkpa-0KwJwdceUr9ywqnI4y&usqp=CAc"
                                                    alt=""
                                                    className="w-[30%] h-[30%]"
                                                />
                                            </Td>
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
