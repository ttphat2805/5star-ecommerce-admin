import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'brand';

// BANNER

const GetBrand = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetBrands = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    // + `?page=${page}&perPage=${perPage}`
    return AxiosInstance.get(Config.apiUrl + url);
};

const AddBrand = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteBrand = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateBrand = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const BrandService = {
    AddBrand,
    GetBrand,
    GetBrands,
    DeleteBrand,
    UpdateBrand,
};

export default BrandService;
