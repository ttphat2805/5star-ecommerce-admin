import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'product';

const getAllProduct = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const addProduct = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const ProductService = {
    getAllProduct,
    addProduct,
};

export default ProductService;
