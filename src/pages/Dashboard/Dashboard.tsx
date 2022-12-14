import { FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useAppSelector } from '~/app/hooks';
import { ClothesIcon, OrderIcon, RevenuneIcon, StarIcon } from '~/components/Icons';
import Image from '~/components/Image';
import LoadingSpin from '~/components/LoadingSpin';
import moment from 'moment';
import Config from '~/config';
import { getUser } from '~/features/user/userSlice';
import OrderService from '~/services/OrderService';
import ProductService from '~/services/ProductService';
import StatisticalService from '~/services/StatisticalService';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';
import './Dashboard.scss';
import ModalOrder from './ModalOrder';
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Top danh mục bán chạy',
        },
    },
};

let fromToChart: any = {};

const Dashboard = () => {
    const [orderProcess, setOrderProcess] = useState<any>([]);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [valueChart, setValueChart] = useState<any>([]);
    const [productSell, setProductSell] = useState<any>([]);
    const [countInfo, setCountInfo] = useState<any>({});
    const infoUser: any = useAppSelector(getUser);

    let dataChartDoughnut = {
        labels: ['Chưa xử lý', 'Đang xử lý', 'Đang giao hàng', 'Thành công', 'Hủy'],
        datasets: [
            {
                label: '# of Votes',
                data: valueChart,
                backgroundColor: ['#eb4d4b', '#f9ca24', '#3742fa', '#2ed573', 'red'],
            },
        ],
    };

    const getCountInfo = async () => {
        let objCount: any = {};
        setLoading(true);
        const countProduct: ResponseType = await StatisticalService.CountProduct();
        const countRate: ResponseType = await StatisticalService.CountRating();
        const countOrder: ResponseType = await StatisticalService.countOrder();
        const revenue: ResponseType = await StatisticalService.Revenue();
        if (
            countProduct.statusCode === 200 &&
            countRate.statusCode === 200 &&
            countOrder.statusCode === 200 &&
            revenue.statusCode === 200
        ) {
            objCount.countProduct = countProduct.data.total;
            objCount.countRate = countRate.data.total;
            objCount.countOrder = countOrder.data.total;
            objCount.revenue = revenue.data.sum;
        }

        setCountInfo(objCount);
        setLoading(false);
    };

    const initChartOrder = () => {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        let fromDate = month + '/' + (day - 10) + '/' + year;
        let toDate = month + '/' + day + '/' + year;
        let dataPost = {
            from: fromDate,
            to: toDate,
        };
        StatisticalService.StatisOrder(dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                let newValue: any = [];
                res.data.forEach((item: any, index: number) => {
                    if (index > 0) {
                        newValue.push(item.total);
                    }
                });
                setValueChart(newValue);
            }
        });
    };

    const handleChartOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'from') {
            fromToChart.from = moment(value).format('MM/DD/YYYY');
        } else {
            fromToChart.to = moment(value).format('MM/DD/YYYY');
        }

        if (fromToChart.from && fromToChart.to) {
            let dataPost = {
                from: fromToChart.from,
                to: fromToChart.to,
            };
            StatisticalService.StatisOrder(dataPost).then((res: ResponseType) => {
                if (res.statusCode === 200) {
                    let newValue: any = [];
                    res.data.forEach((item: any, index: number) => {
                        if (index > 0) {
                            newValue.push(item.total);
                        }
                    });
                    setValueChart(newValue);
                }
            });
        }
    };

    const getTop5ProductSell = () => {
        ProductService.getProductOrderBy({ orderBy: 'sold' }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setProductSell(res.data.data);
            } else {
                console.log(res);
            }
        });
    };

    const getOrderProcess = (page: number | string) => {
        setLoadingModal(true);
        OrderService.GetOrders({ page, status: 1 }).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setOrderProcess(res.data);
                }
                setLoadingModal(false);
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getOrderProcess('');
        getTop5ProductSell();
        getCountInfo();
        initChartOrder();
    }, []);

    return (
        <motion.div>
            <div className="dashboard m-auto rounded-md">
                {loading ? (
                    <LoadingSpin />
                ) : (
                    <div className="rounded-md p-3">
                        <div className="welcome-back-area relative my-[28px] text-white">
                            <span className="text-xl">
                                Chào mừng bạn đến với <b>Trang Quản Trị 5Star</b>
                            </span>
                            <h2 className="text-3xl font-bold text-white my-2">
                                {infoUser.frist_name} {infoUser.last_name}
                            </h2>
                            <p>Hãy thực hiện đúng nhiệm vụ của người quản trị </p>
                            <div className="image absolute right-[150px] top-[-77px] hidden lg:block">
                                <Image
                                    src="https://templates.envytheme.com/joxi/default/assets/images/welcome.png"
                                    className="w-full"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="list-card">
                            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                                <div className="card col-span-1 bg-white p-6 border border-slate-300 !rounded-3xl">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-tbase text-lg font-semibold capitalize">sản phẩm</p>
                                            <p className="text-2xl text-gray-600 font-bold">
                                                <CountUp start={0} end={countInfo.countProduct} duration={1} />
                                            </p>
                                        </div>
                                        <div className="icon text-center ">
                                            <div>
                                                <ClothesIcon
                                                    width={70}
                                                    height={35}
                                                    fillColor1="#fff"
                                                    className="mt-5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card col-span-1 bg-white p-6 border border-slate-300 !rounded-3xl">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-tbase text-lg font-semibold capitalize">đánh giá</p>
                                            <p className="text-2xl text-gray-600 font-bold">
                                                <CountUp start={0} end={countInfo.countRate} duration={1} />
                                            </p>
                                        </div>
                                        <div className="icon text-center ">
                                            <div>
                                                <StarIcon width={70} height={40} className="mt-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card col-span-1 bg-white p-6 border border-slate-300 !rounded-3xl">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-tbase text-lg font-semibold capitalize">đơn hàng</p>
                                            <p className="text-2xl text-gray-600 font-bold">
                                                <CountUp start={0} end={countInfo.countOrder} />
                                            </p>
                                        </div>
                                        <div className="icon text-center ">
                                            <div>
                                                <OrderIcon width={70} height={35} fillColor1="#fff" className="mt-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card col-span-1 bg-white p-6 border border-slate-300 !rounded-3xl">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-tbase text-lg font-semibold capitalize">doanh thu</p>
                                            <p className="text-2xl text-gray-600 font-bold">
                                                <CountUp
                                                    start={0}
                                                    end={countInfo.revenue}
                                                    duration={2.75}
                                                    separator=" "
                                                    decimal=","
                                                    suffix=" VND"
                                                />
                                            </p>
                                        </div>
                                        <div className="icon text-center ">
                                            <div>
                                                <RevenuneIcon
                                                    width={70}
                                                    height={35}
                                                    fillColor1="#fff"
                                                    className="mt-5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-product my-10">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 xl:col-span-8">
                                    <div className="card list-product p-5 rounded-2xl shadow-md h-full">
                                        <div className="w-full px-4 py-2">
                                            <p className="text-bold text-xl text-tbase font-semibold">
                                                Top 5 sản phẩm bán chạy
                                            </p>
                                        </div>
                                        <div className="product px-4 mt-2 overflow-x-auto">
                                            <Table variant="unstyled" borderBottom="1px solid #cccccc69">
                                                <Thead>
                                                    <Tr>
                                                        <Th className="!text-base ">#</Th>
                                                        <Th className="!text-base ">Ảnh</Th>
                                                        <Th className="!text-base ">Tên sản phẩm</Th>
                                                        <Th className="!text-base ">Giá</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {productSell?.map((item: any, index: number) => (
                                                        <Tr key={index}>
                                                            <Td>{index + 1}</Td>
                                                            <Td>
                                                                {item?.images?.length > 0 && (
                                                                    <Image
                                                                        className="w-[150px] h-[120px] object-cover"
                                                                        alt="Ảnh"
                                                                        src={`${Config.apiUrl}upload/${item?.images[0].file_name}`}
                                                                    />
                                                                )}
                                                            </Td>
                                                            <Td>{subString(item?.name)}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 ml-5">
                                    <div className="card chart-pie m-auto p-5 rounded-2xl shadow-md">
                                        <div className="w-full px-4 py-2 text-center">
                                            <p className="text-bold text-xl text-tbase font-semibold">
                                                Thống kê đơn hàng
                                            </p>
                                            <div className="filter-date flex flex-wrap gap-2 justify-center items-center my-4">
                                                <div className="form-group !lg:w-[150px]">
                                                    <FormLabel>Từ ngày</FormLabel>
                                                    <Input
                                                        type="date"
                                                        name="from"
                                                        onChange={(e) => handleChartOrder(e)}
                                                    />
                                                </div>
                                                <div className="form-group !lg:w-[150px]">
                                                    <FormLabel>Đến ngày</FormLabel>
                                                    <Input
                                                        type="date"
                                                        name="to"
                                                        onChange={(e) => handleChartOrder(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Doughnut data={dataChartDoughnut} className="!w-[320px] !h-auto m-auto" />
                                        <div className="m-auto mt-3">
                                            <ModalOrder
                                                getOrderProcess={getOrderProcess}
                                                orderProcess={orderProcess}
                                                loadingModal={loadingModal}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Dashboard;
