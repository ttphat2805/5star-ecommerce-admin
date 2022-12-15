import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import BrandService from '~/services/BrandService';
import { toSlug } from '~/utils/Slug';
import { ResponseType } from '~/utils/Types';
import { addStoreSchema } from '~/utils/validationSchema';

const defaultValues = {
    name: '',
    time: '',
    open_close: '',
    phone: '',
    email: '',
    address: '',
    status: 2,
};

const AddStore = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const Navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>({ defaultValues: defaultValues, resolver: yupResolver(addStoreSchema) });

    const onSubmit = (values: any) => {
        setLoading(true);
        console.log('values: ', values);

        // BrandService.AddBrand(dataPost).then(
        //     (res: ResponseType) => {
        //         if (res.statusCode === 201) {
        //             toast({
        //                 position: 'top-right',
        //                 title: 'Tạo thương hiệu mới thành công',
        //                 duration: 2000,
        //                 status: 'success',
        //             });
        //             setLoading(false);
        //             Navigate('/brand/list-brand');
        //         } else {
        //             toast({
        //                 position: 'top-right',
        //                 title: 'Tạo thương hiệu thất bại',
        //                 duration: 2000,
        //                 status: 'error',
        //             });
        //             setLoading(false);
        //         }
        //     },
        //     (err) => {
        //         setLoading(false);
        //         toast({
        //             position: 'top-right',
        //             title: 'Tạo thương hiệu thất bại',
        //             duration: 2000,
        //             status: 'error',
        //         });
        //     },
        // );
    };

    return (
        <div>
            <Breadcrumb currentPage="Thêm danh mục" currentLink="list-product" parentPage="Danh mục" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm cửa hàng mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField name="name" label="Tên cửa hàng" control={control} error={errors} />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            name="time"
                                            label="Thời gian mở cửa - đóng cửa"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            name="open_close"
                                            label="Ngày mở cửa - đóng cửa"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            name="phone"
                                            label="Số điện thoại"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            name="email"
                                            label="Email liên hệ"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            name="address"
                                            label="Địa chỉ cửa hàng"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
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
                                    <Button type="submit" colorScheme="twitter" isLoading={loading} disabled={loading}>
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

export default AddStore;
