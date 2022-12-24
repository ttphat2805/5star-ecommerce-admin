import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'payment-method';

// BANNER

const GetOrderMethod = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetOrderMethods = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const AddOrderMethod = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteOrderMethod = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateOrderMethod = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const OrderMethodService = {
    AddOrderMethod,
    GetOrderMethod,
    GetOrderMethods,
    DeleteOrderMethod,
    UpdateOrderMethod,
};

export default OrderMethodService;
