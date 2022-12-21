import Config from '~/config';
import AxiosInstance from './AxiosInstance';

let url: string = 'blog';

// BANNER

const GetBlog = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + slug);
};

const GetBlogs = (page: number = 0, title: string = '', perPage: number = Config.PER_PAGE) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&title=${title}`);
};

const AddBlog = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};
const DeleteBlog = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const UpdateBlog = (id: number, data: any) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

// END BANNER

const BlogService = {
    AddBlog,
    GetBlog,
    GetBlogs,
    DeleteBlog,
    UpdateBlog,
};

export default BlogService;
