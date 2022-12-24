import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'comment';

// BANNER

const GetComment = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const GetComments = (page: number = 0, perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}`);
};

const DeleteComment = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateComment = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const CommentService = {
    GetComment,
    GetComments,
    DeleteComment,
    UpdateComment,
};

export default CommentService;
