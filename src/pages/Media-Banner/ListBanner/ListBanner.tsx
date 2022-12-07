import { Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import MediaService from '~/services/MediaService';
import { ResponseType } from '~/utils/Types';

const ListProduct = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [bannerList, setBannerList] = useState<any>([]);

    const toast = useToast();
    const Navigate = useNavigate();
    const getBanners = () => {
        setLoading(true);
        MediaService.getBanners().then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setBannerList(res.data.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        getBanners();
    }, []);

    const handleDeleteBanner = (id: string | any) => {
        setLoading(true);
        MediaService.deleteBanner(id).then(
            (res: any) => {
                if (res.statusCode === 200) {
                    toast({
                        position: 'top-right',
                        title: 'Xóa thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    getBanners();
                    setLoading(false);
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Xóa thất bại',
                        duration: 2000,
                        status: 'error',
                    });
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
            },
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách sản phẩm" currentLink="list-product" parentPage="Sản phẩm" />
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
                                            <Th>Tiêu đề</Th>
                                            <Th>Tiêu đề phụ</Th>
                                            <Th>Ảnh</Th>
                                            <Th>Hành động</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {bannerList?.map((item: any, index: number) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{item.title}</Td>
                                                <Td>{item.sub_title}</Td>
                                                <Td width="200px" height="auto">
                                                    <Image
                                                        src={`${Config.apiUrl}upload/${item?.media?.file_name}`}
                                                        alt=""
                                                        className="w-full h-full object-contain"
                                                    />
                                                </Td>
                                                <Td>
                                                    <div className="flex">
                                                        <span
                                                            className="bg-primary btn mr-2 text-white"
                                                            onClick={() => Navigate('/media/edit-banner/' + item.id)}
                                                        >
                                                            <AiFillEdit className="text-lg" />
                                                        </span>
                                                        <span className="bg-red-500 btn text-white ">
                                                            <ModalConfirm
                                                                handleConfirm={() => handleDeleteBanner(item.id)}
                                                            >
                                                                <IoClose className="text-lg" />
                                                            </ModalConfirm>
                                                        </span>
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
        </motion.div>
    );
};

export default ListProduct;
