import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'api/auth/user';

const signUp = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url + '/sigup', data);
};

const AuthService = {
    signUp,
};

export default AuthService;
