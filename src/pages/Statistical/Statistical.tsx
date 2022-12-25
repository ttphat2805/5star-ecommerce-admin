import React, { useState } from 'react';
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
import { Button, FormLabel, Input } from '@chakra-ui/react';

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

const labels = [
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
    '20/12/2022',
];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 1',
            data: [230, 22, 87, 40, 22, 87, 40, 221, 87, 40, 100, 12],
            borderColor: 'red',
            backgroundColor: 'red',
            yAxisID: 'y',
        },
    ],
};

const Statistical = () => {
    const [loading, setLoading] = useState<boolean>(false);

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
                            <Input type="date" />
                        </div>
                        <div className="form-group">
                            <FormLabel>Đến ngày</FormLabel>
                            <Input type="date" />
                        </div>
                        <Button className="!mt-7">Lọc</Button>
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
