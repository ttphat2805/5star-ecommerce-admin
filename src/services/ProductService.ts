import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'product';

const getAllProduct = (page: number = 0, name: string = '', perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&name=${name}`);
};

const addProduct = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const ProductService = {
    getAllProduct,
    addProduct,
};

export default ProductService;
