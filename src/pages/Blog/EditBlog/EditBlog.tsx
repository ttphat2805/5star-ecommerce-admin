import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '~/components/Breadcrumb';
import Config from '~/config';
import { ImageUpload } from '~/layouts/components/AddProduct';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import BlogService from '~/services/BlogService';
import UploadService from '~/services/UploadService';
import { toSlug } from '~/utils/Slug';
import { ResponseType } from '~/utils/Types';
import { motion } from 'framer-motion';

type blogType = {
    title: string;
    content: string;
    status: number;
    image: number;
};

const defaultValues = {
    title: '',
    content: '',
    status: 2,
    image: 0,
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
};
const AddBlog = () => {
    const [idBlog, setIdBlog] = useState<any>();
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<any>(' ');
    const toast = useToast();
    const Navigate = useNavigate();
    const { slug } = useParams();
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<blogType>({ defaultValues: defaultValues });
    const content = watch('content');
    const getBlog = () => {
        BlogService.GetBlog(String(slug)).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                const { title, status, content, id, image } = res.data;
                console.log('status: ', status);
                setIdBlog(id);
                setValue('title', title);
                setValue('status', status);
                setValue('content', content);
                let urlImage = `${Config.apiUrl}upload/${res?.data?.media?.file_name}`;
                setImagePreview({ image: urlImage });
                setImage({ image });
            }
        });
    };

    useEffect(() => {
        getBlog();
    }, []);

    const onSubmit = async (values: any) => {
        let idAvatar: any = 0;
        const { title, content, status } = values;
        const newImage = image.image;
        if (newImage && typeof newImage === 'number') {
            idAvatar = newImage;
        }

        if (newImage && typeof newImage === 'object') {
            idAvatar = await UploadService.requestUploadImage(newImage);
        }
        if (!newImage) {
            toast({
                position: 'top-right',
                title: 'Vui l??ng ch???n ???nh b??a',
                duration: 2000,
                status: 'warning',
            });

            return;
        }

        let dataPost = {
            title,
            content,
            image: Number(idAvatar),
            slug: toSlug(title),
            status: Number(status),
        };
        BlogService.UpdateBlog(idBlog, dataPost).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                toast({
                    position: 'top-right',
                    title: 'C???p nh???t th??nh c??ng',
                    duration: 2000,
                    status: 'success',
                });
                Navigate('/blog/list-blog');
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="C???p nh???t b??i vi???t" parentLink="list-blog" parentPage="B??i vi???t" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">C???p nh???t b??i vi???t m???i</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <div className="">
                                        <InputField
                                            name="title"
                                            label="T??n b??i vi???t"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>

                                <div className="form-group flex gap-6 flex-wrap mt-4 col-span-5">
                                    <FormLabel className="text-tbase">???nh b??a</FormLabel>
                                    <ImageUpload
                                        image={image}
                                        setImage={setImage}
                                        imagePreview={imagePreview}
                                        setImagePreview={setImagePreview}
                                        name="image"
                                        className="w-[180px] h-[180px]"
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <FormLabel className="text-tbase">N???i dung b??i vi???t</FormLabel>
                                    <ReactQuill
                                        className="custom-quill h-auto"
                                        theme="snow"
                                        value={content}
                                        onChange={(data) => setValue('content', data)}
                                        modules={modules}
                                        placeholder="Nh???p m?? t??? b??i vi???t c???a b???n..."
                                    />
                                </div>

                                <div className="form-group mt-5">
                                    <FormLabel>Tr???ng th??i</FormLabel>
                                    <div className=" flex gap-2">
                                        <RadioField
                                            label="Hi???n"
                                            name="status"
                                            value="1"
                                            id="status-1"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="???n"
                                            name="status"
                                            value="2"
                                            id="status-2"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="btn-action flex items-center justify-center mt-5">
                                    <Button type="submit" colorScheme="twitter">
                                        C???p nh???t
                                    </Button>
                                    <Button type="button" className="mx-2" onClick={() => Navigate('/blog/list-blog')}>
                                        Quay l???i
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddBlog;
