import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Breadcrumb from '~/components/Breadcrumb';

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const data = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: ['#88d3ce', '#97d9e1', '#7028e4'],
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
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels2 = ['January', 'February', 'March'];
export const data2 = {
    labels: labels2,
    datasets: [
        {
            label: 'sp1',
            data: [200, 585, 850],
            backgroundColor: '#6c5ce7',
            borderWidth: 1,
            borderRadius: 20,
            borderSkipped: false,
        },
        {
            label: '12312fasg',
            data: [120, 284, 992],
            backgroundColor: '#ff7675',
            borderWidth: 2,
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
    return (
        <div>
            <Breadcrumb />
            <h1>Dashboard</h1>
            <h1>HELLO DASHBOARD</h1>
            <div className="chart">
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <Pie data={data} className="!w-[500px] !h-auto" />
                    </div>
                    <div className="col-span-1">
                        <Bar options={options} data={data2} />;
                    </div>
                    <div className="col-span-1">
                        <Line options={options2} data={data3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
