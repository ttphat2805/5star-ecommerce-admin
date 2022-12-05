import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import { toSlug } from '~/utils/Slug';

const defaultValues = {
    name: '',
    status: 2,
};

const AddCoupon = () => {
    const toast = useToast();
    const Navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<any>({ defaultValues: defaultValues });

    const handleRandomCode = () => {
        const length = 6;
        let result = '5Star';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setValue('code', result.toUpperCase());
    };

    const onSubmit = (values: any) => {
        const { name, status } = values;
        const dataPost = {
            name,
            slug: toSlug(name),
            status: Number(status),
        };
    };

    return (
        <div>
            <Breadcrumb currentPage="Thêm mã giảm giá" currentLink="list-product" parentPage="Mã giảm giá" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Thêm mã giảm giá mới</h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField name="name" label="Tiêu đề" control={control} error={errors} />
                                    </div>
                                    <div className="col-span-1 relative">
                                        <InputField name="code" label="Mã giảm giá" control={control} error={errors} />
                                        <Button className="!absolute !right-0 !top-[45%]" onClick={handleRandomCode}>
                                            Ngẫu nhiên
                                        </Button>
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            type="datetime-local"
                                            name="dateStart"
                                            label="Ngày bắt đầu"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            type="datetime-local"
                                            name="dateEnd"
                                            label="Ngày kết thúc"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            name="min_order"
                                            label="Đơn hàng tối thiểu"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField name="quantity" label="Số lượng" control={control} error={errors} />
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

export default AddCoupon;
