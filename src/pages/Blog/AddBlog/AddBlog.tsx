import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '~/components/Breadcrumb';
import { ImageUpload } from '~/layouts/components/AddProduct';
import { InputField, RadioField, TextareaField } from '~/layouts/components/CustomField';
import { toSlug } from '~/utils/Slug';

const defaultValues = {
    name: '',
    status: 2,
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
    } = useForm<any>({ defaultValues: defaultValues });

    const onSubmit = (values: any) => {
        console.log('values: ', values);

        const dataPost = {};
    };

    return (
        <div>
            <Breadcrumb currentPage="Thêm bài viết" currentLink="list-blog" parentPage="Bài viết" />
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
                                        <InputField name="name" label="Tên bài viết" control={control} error={errors} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="">
                                        <TextareaField
                                            name="description"
                                            label="Mô tả"
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
                                <div className="form-group my-5 md:h-[200px] h-[250px]">
                                    <FormLabel className="text-tbase">Nội dung bài viết</FormLabel>
                                    <ReactQuill
                                        className="custom-quill h-[120px]"
                                        theme="snow"
                                        onChange={(data) => setValue('content', data)}
                                        modules={modules}
                                        placeholder="Nhập mô tả bài viết của bạn..."
                                    />
                                </div>

                                <div className="form-group mt-3">
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
                                        Thêm thương hiệu
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
        </div>
    );
};

export default AddBlog;
