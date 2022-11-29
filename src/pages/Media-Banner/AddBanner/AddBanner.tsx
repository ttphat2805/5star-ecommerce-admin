import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import MediaService from '~/services/MediaService';
import UploadService from '~/services/UploadService';
import { BannerType } from '~/utils/Types';
import { addBannerSchema } from '~/utils/validationSchema';
import './AddBanner.scss';

const initialValues = {
    title: '',
    sub_title: '',
    link: '',
    image: 0,
    status: 0,
};

const AddBanner = () => {
    const [imageURL, setImageURL] = useState<string>();
    const [fileBanner, setFileBanner] = useState<File | any>();
    const toast = useToast();
    const dragUploadRef = useRef<HTMLHeadingElement>(null);
    // INIT FORM
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BannerType>({ defaultValues: initialValues, resolver: yupResolver(addBannerSchema) });

    const onDragEnter = () => dragUploadRef.current?.classList.add('active');
    const onDragLeave = () => dragUploadRef.current?.classList.remove('active');
    const onDrop = () => dragUploadRef.current?.classList.remove('active');

    // handle remove Image URL old avoid memory leak
    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL);
        };
    }, [imageURL]);

    const handleSubmitForm = async (values: BannerType) => {
        if (!fileBanner) {
            toast({
                title: 'Cảnh báo',
                position: 'top-right',
                description: 'Vui lòng chọn file ảnh',
                status: 'warning',
                duration: 2000,
            });
        }

        let imageResUpload: number | any = await UploadService.requestUploadImage(fileBanner[0]);

        let dataSendRequest = {
            ...values,
            status: +values.status,
            image: imageResUpload,
        };
        MediaService.AddBanner(dataSendRequest).then(
            (res: any) => {
                if (res.statusCode === 201) {
                    toast({
                        position: 'top-right',
                        title: 'Tạo banner mới thành công',
                        duration: 2000,
                        status: 'success',
                    });
                }
            },
            // ERROR ADD BANNER
            (err) => {
                console.log(err);
                toast({
                    position: 'top-right',
                    title: 'Tạo banner thất bại',
                    duration: 2000,
                    status: 'error',
                });
            },
        );
    };

    const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files;

        const dataImageUrl = URL?.createObjectURL(file[0]);

        setFileBanner(file);
        setImageURL(dataImageUrl);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumb currentPage="Thêm danh mục" currentLink="list-product" parentPage="Danh mục" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm banner mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(handleSubmitForm)}>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <InputField
                                        type="text"
                                        name="title"
                                        label="Tiêu đề chính"
                                        control={control}
                                        error={errors}
                                    />
                                    <InputField
                                        type="text"
                                        name="sub_title"
                                        label="Tiêu đề phụ"
                                        control={control}
                                        error={errors}
                                    />
                                </div>
                                <div className="form-group">
                                    <InputField
                                        type="text"
                                        name="link"
                                        label="Đường dẫn đến sản phẩm"
                                        control={control}
                                        error={errors}
                                    />
                                </div>
                                <div className="form-group mt-7">
                                    <div
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                        ref={dragUploadRef}
                                        className="drop-wrapper relative block cursor-pointer overflow-hidden max-w-full w-2/4 m-auto border-[2px] 
                                                border-gray-300 border-dashed text-center rounded-md h-[250px]"
                                    >
                                        <div className="drop-container absolute inset-0 left-[-46px] w-full h-full" />
                                        {!imageURL && (
                                            <div className="drop-content flex flex-col items-center justify-center h-full">
                                                <div className="icon z-10">
                                                    <Image
                                                        src="https://media3.giphy.com/media/ygHcr2O5CurJuRaWuw/giphy.gif?cid=6c09b952o6xg8ozg5ot8s3va94aoygevqd4xjhkqt0ojnu6j&rid=giphy.gif&ct=s"
                                                        alt=""
                                                        className="w-[100px] h-full"
                                                    />
                                                </div>
                                                <div className="text-xl text-tbase z-10">
                                                    Kéo thả hoặc nhấn để chọn File
                                                </div>
                                            </div>
                                        )}

                                        <input
                                            onChange={handleUploadFile}
                                            accept="image/*"
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="loading"></div>
                                        <div className="drop-preview absolute inset-0 w-full h-full overflow-hidden text-center">
                                            <div className="image-preview w-full h-full relative z-[2] object-contain">
                                                <img
                                                    src={imageURL}
                                                    alt=""
                                                    className="w-[80%] max-w-full max-h-full m-auto"
                                                />
                                            </div>
                                            {fileBanner && imageURL && (
                                                <>
                                                    <div className="modal absolute inset-0 z-[3] opacity-0 bg-[#00000099]">
                                                        <div className="text-base font-semibold text-white w-full h-full flex flex-col items-center justify-center">
                                                            <p>{fileBanner[0]?.name}</p>
                                                            <div className="line w-[40px] bg-gray-400 h-[2px] rounded-md"></div>
                                                            <p className="name-file">
                                                                Kéo thả hoặc nhấn để thay thế File
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="modal btn absolute right-3 top-2 z-50 opacity-0 hidden">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent border text-white hover:bg-white transition-all duration-200 hover:text-tbase"
                                                            onClick={() => setImageURL('')}
                                                        >
                                                            Hủy bỏ
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <FormLabel>Trạng thái</FormLabel>
                                    <div className=" flex gap-2">
                                        <RadioField
                                            label="Hiện"
                                            name="status"
                                            value={1}
                                            id="status-2"
                                            control={control}
                                            error={errors}
                                        />
                                        <RadioField
                                            label="Ẩn"
                                            name="status"
                                            value={0}
                                            id="status-1"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>

                                <div className="btn-action flex items-center justify-center mt-5">
                                    {/* isLoading={formik.isSubmitting} */}
                                    <Button type="submit" colorScheme="twitter">
                                        Thêm danh mục
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

export default AddBanner;
