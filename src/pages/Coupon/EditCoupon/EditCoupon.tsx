import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import CouponService from '~/services/CouponService';
import { CouponType, ResponseType } from '~/utils/Types';
import { addCouponSchema } from '~/utils/validationSchema';
import { useEffect, useState } from 'react';

const defaultValues = {
    name: '',
    code: '',
    expirate_date: moment().format('yyyy-MM-DD'),
    start_date: moment().format('yyyy-MM-DD'),
    quantity: 0,
    type: 1,
    discount: 0,
    min_order: 0,
    max_order: 0,
    status: 2,
};

// const options = [
//     { label: 'Giảm theo tiền', value: 1 },
//     { label: 'Giảm theo %', value: 2 },
// ];

const EditCoupon = () => {
    const toast = useToast();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CouponType>({ defaultValues: defaultValues, resolver: yupResolver(addCouponSchema) });

    const getCoupon = () => {
        setLoading(true);
        CouponService.getCoupon(Number(id)).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    setValueForm(res.data);
                    setLoading(false);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getCoupon();
    }, [id]);

    const setValueForm = (data: any) => {
        setValue('name', data.name);
        setValue('code', data.code);
        setValue('expirate_date', data.expirate_date);
        setValue('start_date', data.start_date);
        setValue('quantity', data.quantity);
        setValue('type', data.type);
        setValue('discount', data.discount);
        setValue('min_order', data.min_order);
        setValue('max_order', data.max_order);
        setValue('status', data.status);
    };

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

    const onSubmit = (values: CouponType) => {
        let dataPost = {
            ...values,
            expirate_date: moment(values.expirate_date).format('MM/DD/YYYY'),
            start_date: moment(values.start_date).format('MM/DD/YYYY'),
        };
        CouponService.updateCoupon(dataPost, Number(id)).then(
            (res: ResponseType) => {
                console.log('res: ', res);
                if (res.statusCode === 200) {
                    reset(defaultValues);
                    toast({
                        position: 'top-right',
                        title: 'Cập nhật thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    Navigate('/coupon/list-coupon');
                }
            },
            (err) => {
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
            <Breadcrumb currentPage="Cập nhật mã giảm giá" currentLink="list-coupon" parentPage="Mã giảm giá" />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">
                                Cập nhật mã : <b></b>
                            </h3>
                        </div>
                        <div className="card text-base p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField name="name" label="Tiêu đề" control={control} error={errors} />
                                    </div>
                                    <div className="col-span-1 flex gap-2">
                                        <InputField
                                            name="code"
                                            label="Mã giảm giá"
                                            control={control}
                                            error={errors}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    {/* <div className="col-span-1">
                                        <SelectField
                                            name="type"
                                            label="Loại giảm giá"
                                            options={options}
                                            control={control}
                                            error={errors}
                                        />
                                    </div> */}
                                    <div className="col-span-1">
                                        <InputField
                                            name="discount"
                                            label="Số tiền giảm"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField name="quantity" label="Số lượng" control={control} error={errors} />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            type="number"
                                            name="min_order"
                                            label="Đơn hàng tối thiểu"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            name="max_order"
                                            type="number"
                                            label="Đơn hàng tối đa"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                </div>
                                <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <InputField
                                            type="date"
                                            name="start_date"
                                            label="Ngày bắt đầu"
                                            control={control}
                                            error={errors}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InputField
                                            type="date"
                                            name="expirate_date"
                                            label="Ngày kết thúc"
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
                                    <Button type="submit" colorScheme="twitter">
                                        Cập nhật
                                    </Button>
                                    <Button
                                        type="button"
                                        className="mx-2"
                                        onClick={() => Navigate('/coupon/list-coupon')}
                                    >
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

export default EditCoupon;