import Config from '~/config';
import { LoginType } from '~/utils/Types';
import AxiosInstance from './AxiosInstance';

let url: string = 'auth';

const signIn = (data: LoginType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/login', data);
};

const updateRole = (data: any, id: number) => {
    return AxiosInstance.put(Config.apiUrl + url + '/role/' + id, data);
};

const AuthService = {
    signIn,
    updateRole,
};

export default AuthService;
