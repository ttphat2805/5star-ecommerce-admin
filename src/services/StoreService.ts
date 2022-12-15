import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'store';

// BANNER

const GetStore = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetStores = () => {
    return AxiosInstance.get(Config.apiUrl + url);
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

const BrandService = {
    AddStore,
    GetStore,
    GetStores,
    DeleteStore,
    UpdateStore,
};

export default BrandService;
