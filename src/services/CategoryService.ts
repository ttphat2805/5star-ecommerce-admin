import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'category';

const addCategory = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getAllCategory = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const CategoryService = {
    addCategory,
    getAllCategory,
};

export default CategoryService;
