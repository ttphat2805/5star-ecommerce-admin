import { Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
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
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    //

    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);
    const toast = useToast();
    const Navigate = useNavigate();

    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        getBanners(selected);
    };

    const getBanners = (page: number = 0) => {
        setLoading(true);
        MediaService.getBanners(page).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setTotalCount(res.data.total);
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
                    getBanners(pageNumber);
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
            <Breadcrumb currentPage="Danh sách sản phẩm" parentLink="list-product" parentPage="Sản phẩm" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
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
                                                            <Button
                                                                p={1}
                                                                colorScheme="twitter"
                                                                className="mx-2"
                                                                onClick={() =>
                                                                    Navigate('/media/edit-banner/' + item.id)
                                                                }
                                                            >
                                                                <AiFillEdit className="text-lg" />
                                                            </Button>
                                                            <ModalConfirm
                                                                handleConfirm={() => handleDeleteBanner(item.id)}
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
                                    {bannerList?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Không tồn tại thông tin nào
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {totalPage > 0 && (
                        <div className="pagination-feature flex">
                            <ReactPaginate
                                previousLabel={<BiChevronLeft className="inline text-xl" />}
                                nextLabel={<BiChevronRight className="inline text-xl" />}
                                pageCount={totalPage}
                                onPageChange={handlePageChange}
                                activeClassName={'page-item active'}
                                disabledClassName={'page-item disabled'}
                                containerClassName={'pagination'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                pageLinkClassName={'page-link'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ListProduct;
