import Config from '~/config';
import { BannerType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'banner';

// BANNER

const AddBanner = (data: BannerType) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getBanners = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(`${Config.apiUrl}${url}?perPage=${perPage}&page=${page}`);
};

const updateBanner = (data: BannerType, id: number) => {
    return AxiosInstance.put(`${Config.apiUrl}${url}/${id}`, data);
};

const getBanner = (id: number) => {
    return AxiosInstance.get(`${Config.apiUrl}${url}/${id}`);
};

const deleteBanner = (id: number) => {
    return AxiosInstance.delete(`${Config.apiUrl}${url}/${id}`);
};
// END BANNER

const MediaService = {
    AddBanner,
    getBanners,
    getBanner,
    deleteBanner,
    updateBanner,
};

export default MediaService;
