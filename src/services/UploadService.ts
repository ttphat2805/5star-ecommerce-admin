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

const handleUploadImages = async (arrImage: any) => {
    let arrImageNew = [];
    for (let img of arrImage) {
        const imageRes = await requestUploadImage(img);
        arrImageNew.push(imageRes);
    }

    return arrImageNew;
};

const requestUploadImage = async (fileImage: any) => {
    const formData = new FormData();
    formData.append('file', fileImage);
    try {
        // CALL SERVICES UPLOAD
        let idImage = await UploadImage(formData);
        return idImage ? idImage : 0;
    } catch (error) {
        console.log(error);
    }
};

const UploadService = {
    UploadImage,
    handleUploadImages,
    requestUploadImage,
};

export default UploadService;
