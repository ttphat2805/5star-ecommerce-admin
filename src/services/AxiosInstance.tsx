import axios, { AxiosRequestConfig } from 'axios';
import Config from '~/config';

const baseURL = Config.apiUrl;

const AxiosInstance = axios.create({
    baseURL: baseURL,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
    function (request: AxiosRequestConfig<any> | any) {
        // Do something before request is sent
        request.headers['Authorization'] = `Bearer ${getLocalAccessToken()}`;
        return request;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
    async function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const config: AxiosRequestConfig<any> | any = response.config;
        const { code, msg } = response.data;
        if (code && code === 401) {
            if (msg && msg === 'jwt expired') {
                //TOKEN EXPIRED
                const accessToken = await refreshToken(); // GET API CALL REFRESHTOKEN
                if (accessToken) {
                    //SET HEADERS ACCESS TOKEN NEW
                    config.headers['Authorization'] = `Bearer ${accessToken}`;

                    // SET CLIENT ACCESS TOKEN NEW

                    localStorage.setItem('access_token', accessToken);

                    return AxiosInstance(config);
                }
            }
        }

        return response && response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // HANDLE TOKEN EXPIRED

        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

const refreshToken = async () => {
    return 'abc;';
};

const getLocalAccessToken = () => {
    return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
};

export default AxiosInstance;
