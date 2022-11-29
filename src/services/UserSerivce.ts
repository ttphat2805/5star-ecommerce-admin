import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'user';

// BANNER

const GetUser = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetUsers = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const DeleteUser = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateUser = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const UserService = {
    UpdateUser,
    GetUser,
    GetUsers,
    DeleteUser,
};

export default UserService;
