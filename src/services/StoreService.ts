import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'store-system';

// BANNER

const GetStore = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetStores = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const AddStore = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteStore = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateStore = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const StoreService = {
    AddStore,
    GetStore,
    GetStores,
    DeleteStore,
    UpdateStore,
};

export default StoreService;
