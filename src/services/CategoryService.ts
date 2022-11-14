import Config from '~/config';
import { Category } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'category';

const addCategory = (data: Category) => {
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
