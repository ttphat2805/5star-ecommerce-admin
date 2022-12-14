import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'coupon';

const getCoupons = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const getCoupon = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const updateCoupon = (data: any, id: number) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

const addCoupon = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const deleteCoupon = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const CouponService = {
    getCoupons,
    addCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};

export default CouponService;
