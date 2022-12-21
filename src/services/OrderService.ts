import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'order';

// BANNER

const GetOrder = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetOrders = (page: number = 0, status: string = '', perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&status=${status}`);
};

const AddOrder = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteOrder = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateStatusOrder = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + `/${id}`, data);
};

// END BANNER

const OrderService = {
    AddOrder,
    GetOrder,
    GetOrders,
    DeleteOrder,
    UpdateStatusOrder,
};

export default OrderService;
