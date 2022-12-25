import Config from '~/config';
import AxiosInstance from './AxiosInstance';

const CountProduct = () => {
    return AxiosInstance.get(Config.apiUrl + 'product/count');
};
const CountRating = () => {
    return AxiosInstance.get(Config.apiUrl + 'rating/count');
};

const countOrder = () => {
    return AxiosInstance.get(Config.apiUrl + 'order/count');
};
const Revenue = () => {
    return AxiosInstance.get(Config.apiUrl + 'order/sum?status=4');
};

const StatisOrder = ({ from, to }: any) => {
    return AxiosInstance.get(Config.apiUrl + `order/count-statistic?created_from=${from}&created_to=${to}`);
};

const StatisticalService = {
    CountProduct,
    CountRating,
    Revenue,
    countOrder,
    StatisOrder,
};

export default StatisticalService;
