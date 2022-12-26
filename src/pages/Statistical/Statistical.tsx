import { FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Image from '~/components/Image';
import Config from '~/config';
import ProductService from '~/services/ProductService';
import StatisticalService from '~/services/StatisticalService';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Filler, Legend);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Biểu đồ thống kê tổng tiền đơn hàng theo ngày',
        },
    },
};

export const optionsBar = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

let fromToChart: any = {};

const Statistical = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [labelChart, setLabelChart] = useState<any>([]);
    const [dataChart, setDataChart] = useState<any>([]);
    const [productSell, setProductSell] = useState<any>([]);
    const [blogViews, setBlogViews] = useState<any>([]);

    const toast = useToast();

    const labels = labelChart;

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Tổng tiền',
                data: dataChart,
                borderColor: 'rgb(130, 204, 221)',
                backgroundColor: 'rgb(130, 204, 221,0.5)',
            },
        ],
    };

    const labelsBar = ['January', 'February', 'March', 'April'];

    const dataBar = {
        labelsBar,
        datasets: [
            {
                label: 'Dataset 1',
                data: [25, 55, 33, 22],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
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
        StatisticalService.StatisOrderTotalPrice(dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                let newDataChart: any = [];
                let newLabelChart: any = [];
                res?.data.forEach((item: any) => {
                    newLabelChart.push(item?.date);
                    newDataChart.push(item?.total);
                });

                setLabelChart(newLabelChart);
                setDataChart(newDataChart);
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
            const fromLimit = moment().diff(fromToChart.from, 'day');
            const toLimit: number = moment().diff(fromToChart.to, 'day');
            if (fromLimit + Math.abs(toLimit) > 30) {
                toast({
                    position: 'top-right',
                    title: 'Vui lòng chọn giới hạn dưới 30 ngày',
                    duration: 2000,
                    status: 'warning',
                });
                return;
            } else {
                let dataPost = {
                    from: fromToChart.from,
                    to: fromToChart.to,
                };
                StatisticalService.StatisOrderTotalPrice(dataPost).then((res: ResponseType) => {
                    if (res.statusCode === 200) {
                        let newDataChart: any = [];
                        let newLabelChart: any = [];
                        res?.data.forEach((item: any) => {
                            newLabelChart.push(item?.date);
                            newDataChart.push(item?.total);
                        });
                        setLabelChart(newLabelChart);
                        setDataChart(newDataChart);
                    }
                });
            }
        }
    };

    const getTop5ProductViews = () => {
        ProductService.getProductOrderBy({ orderBy: 'views' }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setProductSell(res.data.data);
            } else {
                console.log(res);
            }
        });
    };

    const getTop5BlogViews = () => {
        StatisticalService.StatisBlogTopViews().then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setBlogViews(res.data.data);
            } else {
                console.log(res);
            }
        });
    };

    useEffect(() => {
        initChartOrder();
        getTop5ProductViews();
        getTop5BlogViews();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="chart">
                <div className="chart-1 card rounded-lg shadow-md p-10">
                    <div className="filter-date flex flex-wrap gap-3 items-center">
                        <div className="form-group">
                            <FormLabel>Từ ngày</FormLabel>
                            <Input type="date" name="from" onChange={(e) => handleChartOrder(e)} />
                        </div>
                        <div className="form-group">
                            <FormLabel>Đến ngày</FormLabel>
                            <Input type="date" name="to" onChange={(e) => handleChartOrder(e)} />
                        </div>
                    </div>
                    <div className="w-full m-auto">
                        <Line options={options} data={data} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
                        <div className="col-span-1">
                            <div className="card list-product p-5 rounded-2xl shadow-md h-full border-t border-slate-300">
                                <div className="w-full px-4 py-2">
                                    <p className="text-bold text-xl text-tbase font-semibold">
                                        Top 5 sản phẩm lượt xem cao nhất
                                    </p>
                                </div>
                                <div className="product px-4 mt-2 overflow-x-auto">
                                    <Table variant="unstyled" borderBottom="1px solid #cccccc69">
                                        <Thead>
                                            <Tr>
                                                <Th className="!text-base ">#</Th>
                                                <Th className="!text-base ">Ảnh</Th>
                                                <Th className="!text-base ">Tên sản phẩm</Th>
                                                <Th className="!text-base ">Lượt xem</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {productSell?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td padding={1} marginY={1}>
                                                        {item?.images?.length > 0 && (
                                                            <Image
                                                                className="w-[150px] h-[120px] object-cover"
                                                                alt="Ảnh"
                                                                src={`${Config.apiUrl}upload/${item?.images[0].file_name}`}
                                                            />
                                                        )}
                                                    </Td>
                                                    <Td wordBreak={'break-all'} whiteSpace="normal">
                                                        {subString(item?.name)}
                                                    </Td>
                                                    <Td>{item?.views}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="card list-product p-5 rounded-2xl shadow-md h-full border-t border-slate-300">
                                <div className="w-full px-4 py-2">
                                    <p className="text-bold text-xl text-tbase font-semibold">
                                        Top 5 bài viết lượt xem cao nhất
                                    </p>
                                </div>
                                <div className="product px-4 mt-2 overflow-x-auto">
                                    <Table variant="unstyled" borderBottom="1px solid #cccccc69">
                                        <Thead>
                                            <Tr>
                                                <Th className="!text-base ">#</Th>
                                                <Th className="!text-base ">Ảnh</Th>
                                                <Th className="!text-base ">Bài viết</Th>
                                                <Th className="!text-base ">Lượt xem</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {blogViews?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td padding={1} marginY={1}>
                                                        {item?.media && (
                                                            <Image
                                                                className="w-[150px] h-[120px] object-cover"
                                                                alt="Ảnh"
                                                                src={`${Config.apiUrl}upload/${item?.media.file_name}`}
                                                            />
                                                        )}
                                                    </Td>
                                                    <Td wordBreak={'break-all'} whiteSpace="normal">
                                                        {subString(item?.title)}
                                                    </Td>
                                                    <Td>{subString(item?.views)}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Statistical;
