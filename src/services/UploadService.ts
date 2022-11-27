import Config from '~/config';
import AxiosInstance from './AxiosInstance';

const UploadImage = async (image: FormData) => {
    let resDataImage: any = await AxiosInstance.post(Config.apiUrl + 'file/upload', image);
    let idImageUpload: number = 0;
    if (resDataImage.statusCode === 201) {
        idImageUpload = resDataImage?.data?.id;
    }
    return idImageUpload;
};

const UploadService = {
    UploadImage,
};

export default UploadService;
