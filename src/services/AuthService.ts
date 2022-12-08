import Config from '~/config';
import { LoginType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'auth';

const signIn = (data: LoginType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/login', data);
};

const AuthService = {
    signIn,
};

export default AuthService;
