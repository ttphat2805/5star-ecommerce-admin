import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import StoreService from '~/services/StoreService';
import { ResponseType } from '~/utils/Types';
import { addStoreSchema } from '~/utils/validationSchema';
import { motion } from 'framer-motion';

interface storeType {
    address: string;
    email: string;
    name: string;
    phone: string;
    open_close: string;
    time: string;
    status: number;
}

const defaultValues = {
    address: '',
    email: '',
    name: '',
    phone: '',
    open_close: '',
    time: '',
    status: 2,
};
const AddStore = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const Navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<storeType>({ defaultValues: defaultValues, resolver: yupResolver(addStoreSchema) });

    const getStore = () => {
        setLoading(true);
        StoreService.GetStore(Number(id)).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                const { name, time, open_close, phone, email, address, status } = res?.data;
                setValue('name', name);
                setValue('time', time);
                setValue('open_close', open_close);
                setValue('phone', phone);
                setValue('email', email);
                setValue('address', address);
                setValue('status', status);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        getStore();
    }, []);

    const onSubmit = (values: storeType) => {
        setLoading(true);
        StoreService.UpdateStore(Number(id), values).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    toast({
                        position: 'top-right',
                        title: 'Cập nhật cửa hàng thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    setLoading(false);
                    Navigate('/store/list-store');
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Cập nhật thất bại',
                        duration: 2000,
                        status: 'error',
                    });
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thất bại',
                    duration: 2000,
                    status: 'error',
                });
            },
        );
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
                            <h3 className="card-title">Thêm cửa hàng mới</h3>
                        </div>
                        {loading ? (
                            <LoadingSpin />
                        ) : (
                            <div className="card text-base p-3">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <div className="col-span-1">
                                            <InputField
                                                name="name"
                                                label="Tên cửa hàng"
                                                control={control}
                                                error={errors}
                                            />
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
                                        <Button
                                            type="submit"
                                            colorScheme="twitter"
                                            isLoading={loading}
                                            disabled={loading}
                                        >
                                            Thêm thương hiệu
                                        </Button>
                                        <Button type="button" className="mx-2">
                                            Quay lại
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddStore;
