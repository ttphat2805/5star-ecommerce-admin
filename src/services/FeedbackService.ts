import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'rating';

// BANNER

const GetRating = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetRatings = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const AddRating = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteRating = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateRating = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const RatingService = {
    AddRating,
    GetRating,
    GetRatings,
    DeleteRating,
    UpdateRating,
};

export default RatingService;
