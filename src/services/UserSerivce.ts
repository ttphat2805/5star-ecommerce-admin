import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'user';

// BANNER

const GetUser = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetUsers = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const DeleteUser = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateUser = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

const updateRole = (data: any, id: number) => {
    return AxiosInstance.put(Config.apiUrl + url + '/role/' + id, data);
};
// END BANNER

const UserService = {
    UpdateUser,
    GetUser,
    GetUsers,
    DeleteUser,
    updateRole,
};

export default UserService;
