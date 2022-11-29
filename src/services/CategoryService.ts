import Config from '~/config';
import { CategoryType, SubCategoryType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'category';

const addCategory = (data: CategoryType) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getAllCategory = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const getOneCategory = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + slug);
};

const getCategoryParent = async () => {
    try {
        let resCategory: any = await AxiosInstance.get(Config.apiUrl + url);
        let dataCategory: any = [];
        if (resCategory.statusCode === 200) {
            for (let category of resCategory.data[0]) {
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
        for (let category of resCategory.data[0]) {
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
