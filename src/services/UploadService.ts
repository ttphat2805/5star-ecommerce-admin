import axios from 'axios';
import Config from '~/config';

let url: string = '';

const UploadImage = async (image: File) => {
    let resDataImage: any = await axios.post(
        Config.apiUrl + 'file',
        { type: image.type },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if (resDataImage.data.statusCode === 201) {
        const URL_UPLOAD = resDataImage.data.data.url;

        await axios.put(URL_UPLOAD, image, {
            headers: {
                'Content-Type': image.type,
            },
        });
    }

    return resDataImage.data;
};

const UploadService = {
    UploadImage,
};

export default UploadService;
