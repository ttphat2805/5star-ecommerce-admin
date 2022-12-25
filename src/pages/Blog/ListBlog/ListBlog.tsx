import { Button, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import Config from '~/config';
import ModalConfirm from '~/layouts/components/ModalConfirm';
import BlogService from '~/services/BlogService';
import UserService from '~/services/UserSerivce';
import { Debounce } from '~/utils/Debouce';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';

const ListBlog = () => {
    const [blog, setBlog] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    // END STATE
    const totalPage = Math.ceil(totalCount / Config.PER_PAGE);
    const Navigate = useNavigate();
    const toast = useToast();

    const handlePageChange = ({ selected }: any) => {
        getAllBlog(selected);
        setPageNumber(selected);
    };

    const handleDelete = (id: string | any) => {
        BlogService.DeleteBlog(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'Xóa thành công',
                    duration: 2000,
                    status: 'success',
                });
                getAllBlog(pageNumber);
            }
        });
    };
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);
        getAllBlog(0, value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(Debounce(handleSearch, 1000), []);

    const getAllUSer = () => {
        UserService.GetUsers().then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setUser(res.data.data);
            }
        });
    };

    const getAllBlog = (page: number, title: string = '') => {
        setLoading(true);
        BlogService.GetBlogs(page, title).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setTotalCount(res.data.total);
                    setBlog(res.data.data);
                }
                setLoading(false);
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const getNameUser = (id: number) => {
        const result: any = user.filter((item: any) => {
            return item.id === id;
        })[0];
        let nameUser = `${result?.first_name}  ${result?.last_name}`;
        return nameUser;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getAllUSer();
        getAllBlog(0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Danh sách bài viết" parentLink="category/list-category" parentPage="Bài viết" />
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            <div className="status-order flex justify-end flex-col items-end mb-3">
                                <div className="w-full md:w-[350px]">
                                    <FormLabel>Tìm kiếm:</FormLabel>
                                    <Input onChange={debounceSearch} placeholder="Tìm bài viết..." />
                                </div>
                            </div>
                            {loading ? (
                                <LoadingSpin />
                            ) : (
                                <>
                                    <Table className="w-full">
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>Tiêu đề</Th>
                                                <Th>Hình</Th>
                                                <Th>Người đăng</Th>
                                                <Th>Ngày đăng</Th>
                                                <Th>Trạng thái</Th>
                                                <Th>Hành động</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {blog?.length > 0 &&
                                                blog?.map((item: any, index: number) => (
                                                    <Tr key={index}>
                                                        <Td>{index + 1}</Td>
                                                        <Td>{subString(item?.title)}</Td>
                                                        <Td>
                                                            <img
                                                                src={`${Config.apiUrl}upload/${item?.media?.file_name}`}
                                                                alt=""
                                                                className="w-[200px] h-[120px] object-contain"
                                                            />
                                                        </Td>
                                                        <Td>{getNameUser(item?.user_id)}</Td>
                                                        <Td>{moment(item?.create_at).format('DD-MM-YYYY hh:mm')}</Td>
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
                                                                        Navigate('/blog/update-blog/' + item.slug)
                                                                    }
                                                                >
                                                                    <AiFillEdit className="text-lg" />
                                                                </Button>
                                                                <ModalConfirm
                                                                    handleConfirm={() => handleDelete(item.id)}
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
                                    {blog?.length === 0 && (
                                        <p className="text-xl font-semibold text-center my-5">
                                            Không tồn tại thông tin nào
                                            <IoCloseOutline className="inline-block font-semibold text-red-500" />
                                        </p>
                                    )}
                                </>
                            )}
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
            </div>
        </motion.div>
    );
};

export default ListBlog;
