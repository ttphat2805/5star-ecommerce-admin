import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpin from '~/components/LoadingSpin';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, FormLabel, Input, useToast } from '@chakra-ui/react';
import moment from 'moment';
import StatisticalService from '~/services/StatisticalService';
import { ResponseType } from '~/utils/Types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ thống kê tổng tiền đơn hàng theo ngày',
        },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
    },
};

let fromToChart: any = {};

const Statistical = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [labelChart, setLabelChart] = useState<any>([]);
    const [dataChart, setDataChart] = useState<any>([]);
    const toast = useToast();
    const labels = labelChart;

    const data = {
        labels,
        datasets: [
            {
                label: 'Tổng tiền',
                data: dataChart,
                borderColor: 'red',
                backgroundColor: 'red',
                yAxisID: 'y',
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

    useEffect(() => {
        initChartOrder();
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
                        <Line options={options} data={data} className="!w-[80%] !h-auto m-auto" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Statistical;
