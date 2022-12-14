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
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useAppSelector } from '~/app/hooks';
import Image from '~/components/Image';
import { getUser } from '~/features/user/userSlice';
import './Dashboard.scss';
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const data = {
    labels: ['Áo', 'Quần', 'Đồng hồ', 'Phụ kiện', 'Túi xách'],
    datasets: [
        {
            label: '# of Votes',
            data: [15, 12, 7, 20, 8],
            backgroundColor: ['#FF6A88', '#80D0C7', '#7028e4', '#C850C0', '#8EC5FC'],
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
    const infoUser: any = useAppSelector(getUser);

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
                    <div className="features-area">
                        <div className="chart">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    <Pie data={data} className="!w-[400px] !h-auto" />
                                </div>
                                <div className="col-span-1">
                                    <Bar options={options} data={data2} />;
                                </div>
                                {/* <div className="col-span-1">
                                    <Line options={options2} data={data3} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
