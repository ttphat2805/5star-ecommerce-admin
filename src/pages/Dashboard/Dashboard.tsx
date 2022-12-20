import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useAppSelector } from '~/app/hooks';
import { ClothesIcon, OrderIcon, RevenuneIcon, StarIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Config from '~/config';
import { getUser } from '~/features/user/userSlice';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';
import './Dashboard.scss';
import ModalOrder from './ModalOrder';
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const data = {
    labels: ['Áo', 'Quần', 'Đồng hồ', 'Phụ kiện', 'Túi xách'],
    datasets: [
        {
            label: '# of Votes',
            data: [15, 12, 7, 20, 8],
            backgroundColor: ['#FF6A88', 'rgb(79, 203, 141)', '#7028e4', '#C850C0', 'rgb(23, 101, 253)'],
        },
    ],
};

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

const labels2 = ['Áo Polo', 'Áo Sơ mi', 'Quần Tây', 'Quần thể thao', 'Áo khoác'];
export const data2 = {
    labels: labels2,
    datasets: [
        {
            label: '',
            data: [101, 22, 87, 40, 57],
            backgroundColor: '#6c5ce7',
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
        },
    ],
};

export const options2 = {
    responsive: true,

    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};
const labels = ['January', 'February', 'March', 'test', 'ok', '312312'];

export const data3 = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [200, 300, 500, 200, 10, 151],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
        },
        {
            label: 'Dataset 2',
            data: [512, 302, 200, 492, 20, 302],
            borderWith: 5,
            borderColor: '#44bd32',
            backgroundColor: '#273c75',
            yAxisID: 'y1',
        },
    ],
};

const Dashboard = () => {
    const [order, setOrder] = useState<any>([]);

    const infoUser: any = useAppSelector(getUser);

    const getOrder = (id: number) => {
        OrderService.GetOrder(id).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setOrder(res.data);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getOrder(10);
    }, []);

    return (
        <motion.div>
            <div className="dashboard m-auto rounded-md">
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
                                            <CountUp start={0} end={158} duration={2.75} decimals={2} decimal="," />
                                        </p>
                                    </div>
                                    <div className="icon text-center ">
                                        <div>
                                            <ClothesIcon width={70} height={35} fillColor1="#fff" className="mt-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card col-span-1 bg-white p-6 border border-slate-300 !rounded-3xl">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-tbase text-lg font-semibold capitalize">đánh giá</p>
                                        <p className="text-2xl text-gray-600 font-bold">
                                            <CountUp start={0} end={158} duration={2.75} decimals={2} decimal="," />
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
                                            <CountUp
                                                start={0}
                                                end={200}
                                                duration={2.75}
                                                suffix=" VND"
                                                decimals={2}
                                                decimal=","
                                            />
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
                                            <CountUp start={0} end={2500000} duration={2.75} decimals={2} decimal="," />
                                        </p>
                                    </div>
                                    <div className="icon text-center ">
                                        <div>
                                            <RevenuneIcon width={70} height={35} fillColor1="#fff" className="mt-5" />
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
                                                {order?.details?.map((item: any, index: number) => (
                                                    <Tr key={index}>
                                                        <Td>{index + 1}</Td>
                                                        <Td>
                                                            {item?.product_info?.product?.images?.length > 0 && (
                                                                <Image
                                                                    className="w-[150px] h-[120px] object-cover"
                                                                    alt="Ảnh"
                                                                    src={`${Config.apiUrl}upload/${item?.product_info?.product?.images[0].file_name}`}
                                                                />
                                                            )}
                                                        </Td>
                                                        <Td>{subString(item?.product_info?.product?.name, 40)}</Td>
                                                        <Td>{FormatPriceVND(item?.price * item?.quantity || 0)}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 xl:col-span-4 ml-5">
                                <div className="card chart-pie m-auto p-5 rounded-2xl shadow-md">
                                    <div className="w-full px-4 py-2">
                                        <p className="text-bold text-xl text-tbase font-semibold">Thống kê đơn hàng</p>
                                    </div>
                                    <Doughnut data={data} className="!w-[300px] !h-auto m-auto" />
                                    <div className="m-auto mt-3">
                                        <ModalOrder />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="features-area">
                        <div className="chart">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    <Pie data={data} className="!w-[400px] !h-auto" />
                                </div>
                                <div className="col-span-1">
                                    <Bar options={options} data={data2} />;
                                </div>
                                <div className="col-span-1">
                                    <Line options={options2} data={data3} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
