import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Breadcrumb from '~/components/Breadcrumb';
import { ImageUpload } from '~/layouts/components/AddProduct';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import BlogService from '~/services/BlogService';
import UploadService from '~/services/UploadService';
import { toSlug } from '~/utils/Slug';
import { ResponseType } from '~/utils/Types';

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
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<any>(' ');
    const toast = useToast();
    const Navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<blogType>({ defaultValues: defaultValues });

    const onSubmit = async (values: any) => {
        const { title, content, status } = values;
        if (!image?.image) {
            toast({
                position: 'top-right',
                title: 'Vui lòng thêm ảnh bìa',
                duration: 2000,
                status: 'warning',
            });
            return;
        }
        if (image) {
            const idAvatar = await UploadService.requestUploadImage(image.image);

            const dataPost = {
                title,
                content,
                image: idAvatar,
                slug: toSlug(title),
                status: Number(status),
            };
            BlogService.AddBlog(dataPost).then((res: ResponseType) => {
                console.log(res);
                if (res.statusCode === 201) {
                    toast({
                        position: 'top-right',
                        title: 'Thêm bài viết thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    Navigate('/blog/list-blog');
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Thêm bài viết thất bại',
                        duration: 2000,
                        status: 'error',
                    });
                }
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Thêm bài viết" parentLink="list-blog" parentPage="Bài viết" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm bài viết mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <div className="">
                                        <InputField
                                            name="title"
                                            label="Tên bài viết"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>

                                <div className="form-group flex gap-6 flex-wrap mt-4 col-span-5">
                                    <FormLabel className="text-tbase">Ảnh bìa</FormLabel>
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
                                    <FormLabel className="text-tbase">Nội dung bài viết</FormLabel>
                                    <ReactQuill
                                        className="custom-quill h-auto"
                                        theme="snow"
                                        onChange={(data) => setValue('content', data)}
                                        modules={modules}
                                        placeholder="Nhập mô tả bài viết của bạn..."
                                    />
                                </div>

                                <div className="form-group mt-5">
                                    <FormLabel>Trạng thái</FormLabel>
                                    <div className=" flex gap-2">
                                        <RadioField
                                            label="Hiện"
                                            name="status"
                                            value={1}
                                            id="status-1"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="Ẩn"
                                            name="status"
                                            value={2}
                                            id="status-2"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="btn-action flex items-center justify-center mt-5">
                                    <Button type="submit" colorScheme="twitter">
                                        Thêm bài viết
                                    </Button>
                                    <Button type="button" className="mx-2">
                                        Quay lại
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
