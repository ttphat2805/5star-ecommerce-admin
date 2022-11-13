import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = '';

const UploadImage = async (typeImage: string, image: File) => {
    let resDataImage: any = await AxiosInstance.post(
        Config.apiUrl + 'file',
        { type: typeImage },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if (resDataImage.statusCode === 201) {
        const URL_UPLOAD = resDataImage.data.url;
        console.log(URL_UPLOAD);
        console.log(image);

        let dataUpload = await AxiosInstance.put(URL_UPLOAD, image, {
            headers: {
                'Content-Type': image.type,
            },
        });
    }

    return resDataImage;
};

const UploadService = {
    UploadImage,
};

export default UploadService;
