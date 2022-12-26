import Config from '~/config';
import { CategoryType, SubCategoryType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'category';

const addCategory = (data: CategoryType) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getAllCategory = ({ page = 0, perPage = Config.PER_PAGE }: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const getOneCategory = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + slug);
};

const getCategoryParent = async (page = 0, perPage = 100) => {
    try {
        let resCategory: any = await AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
        let dataCategory: any = [];
        if (resCategory.statusCode === 200) {
            for (let category of resCategory.data.data) {
                if (!category.parent_id) {
                    dataCategory.push(category);
                }
            }
            return dataCategory;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCategoryNoParent = async () => {
    let resCategory: any = await AxiosInstance.get(Config.apiUrl + url);
    let dataCategory: any = [];
    if (resCategory.statusCode === 200) {
        for (let category of resCategory.data.data) {
            if (category.parent_id) {
                dataCategory.push(category);
            }
        }
    }

    return dataCategory;
};

const deleteCategory = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const updateCategory = (id: number, data: CategoryType | SubCategoryType) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

const CategoryService = {
    addCategory,
    getAllCategory,
    getCategoryParent,
    getCategoryNoParent,
    deleteCategory,
    getOneCategory,
    updateCategory,
};

export default CategoryService;
