import Config from '~/config';
import { BannerType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'banner';

// BANNER

const AddBanner = (data: BannerType) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

// END BANNER

const MediaService = {
    AddBanner,
};

export default MediaService;
