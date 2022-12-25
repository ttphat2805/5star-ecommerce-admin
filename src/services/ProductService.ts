import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'product';

const getAllProduct = ({ page = '', name, perPage = Config.PER_PAGE }: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&name=${name}`);
};

const getProductOrderBy = ({ orderBy, perPage = 5 }: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `?perPage=${perPage}&orderBy=${orderBy}&orderType=DESC`);
};

const addProduct = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const ProductService = {
    getAllProduct,
    addProduct,
    getProductOrderBy,
};

export default ProductService;
