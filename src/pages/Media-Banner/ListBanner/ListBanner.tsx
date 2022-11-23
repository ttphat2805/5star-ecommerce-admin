import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import ModalConfirm from '~/layouts/components/ModalConfirm';

const ListProduct = () => {
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
                                        <Th>Tiêu đề</Th>
                                        <Th>Tiêu đề phụ</Th>
                                        <Th>Ảnh</Th>
                                        <Th>Hành động</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td>Ưu đãi lớn</Td>
                                        <Td>Trong mùa hè này</Td>
                                        <Td width="200px">
                                            <Image
                                                src="http://localhost:3001/static/media/hero3.cb4660d930692248be75.png"
                                                alt=""
                                            />
                                        </Td>
                                        <Td>
                                            <div className="flex">
                                                <span className="bg-primary btn mr-2 text-white">
                                                    <AiFillEdit className="text-lg" />
                                                </span>
                                                <span className="bg-red-500 btn text-white ">
                                                    <ModalConfirm>
                                                        <IoClose className="text-lg" />
                                                    </ModalConfirm>
                                                </span>
                                            </div>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>2</Td>
                                        <Td>Nhiều ưu đãi hấp dẫn</Td>
                                        <Td>Trong mùa hè này</Td>
                                        <Td width="200px">
                                            <Image
                                                src="http://localhost:3001/static/media/hero2.e5d2705b7e98564ab738.png"
                                                alt=""
                                            />
                                        </Td>
                                        <Td>
                                            <div className="flex">
                                                <span className="bg-primary btn mr-2 text-white">
                                                    <AiFillEdit className="text-lg" />
                                                </span>
                                                <span className="bg-red-500 btn text-white ">
                                                    <ModalConfirm>
                                                        <IoClose className="text-lg" />
                                                    </ModalConfirm>
                                                </span>
                                            </div>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>3</Td>
                                        <Td>Sản phẩm độc đáo</Td>
                                        <Td>Trong mùa hè này</Td>
                                        <Td width="200px">
                                            <Image
                                                src="http://localhost:3001/static/media/hero1.3563ead7c7be2a32eb30.png"
                                                alt=""
                                            />
                                        </Td>
                                        <Td>
                                            <div className="flex">
                                                <span className="bg-primary btn mr-2 text-white">
                                                    <AiFillEdit className="text-lg" />
                                                </span>
                                                <span className="bg-red-500 btn text-white ">
                                                    <ModalConfirm>
                                                        <IoClose className="text-lg" />
                                                    </ModalConfirm>
                                                </span>
                                            </div>
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
