import axios from 'axios';
import Config from '~/config';

const baseURL = Config.apiUrl;

const token = localStorage.getItem('access_token');

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'x-token': token ? `${token}` : '',
    },
});

export default AxiosInstance;
