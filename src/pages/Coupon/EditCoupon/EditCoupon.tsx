import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import LoadingSpin from '~/components/LoadingSpin';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import CouponService from '~/services/CouponService';
import { CouponType, ResponseType } from '~/utils/Types';
import { addCouponSchema } from '~/utils/validationSchema';

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
    const [loadingSubmit, setLoadingSubmit] = useState(false);
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
                } else {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                console.log(err);
            },
        );
    };

    useEffect(() => {
        getCoupon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const setValueForm = (data: any) => {
        console.log('data: ', data);
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

    const onSubmit = (values: CouponType) => {
        setLoadingSubmit(true);
        let dataPost = {
            ...values,
            expirate_date: moment(values.expirate_date).format('MM/DD/YYYY'),
            start_date: moment(values.start_date).format('MM/DD/YYYY'),
        };
        CouponService.updateCoupon(dataPost, Number(id)).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    reset(defaultValues);
                    toast({
                        position: 'top-right',
                        title: 'Cập nhật thành công',
                        duration: 2000,
                        status: 'success',
                    });
                    setLoadingSubmit(false);
                    Navigate('/coupon/list-coupon');
                } else if (res.message === 'start date should be affter now') {
                    setLoadingSubmit(false);
                    toast({
                        position: 'top-right',
                        title: 'Ngày bắt đầu phải lớn hơn ngày hiện tại',
                        duration: 2000,
                        status: 'error',
                    });
                } else if (res.message === 'expirate date should be affter start date') {
                    setLoadingSubmit(false);
                    toast({
                        position: 'top-right',
                        title: 'Ngày hết hạn phải lớn hơn ngày bắt đầu',
                        duration: 2000,
                        status: 'error',
                    });
                } else {
                    setLoadingSubmit(false);
                    toast({
                        position: 'top-right',
                        title: 'Cập nhật thất bại',
                        duration: 2000,
                        status: 'error',
                    });
                }
            },
            (err) => {
                setLoadingSubmit(false);

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
            <Breadcrumb currentPage="Cập nhật mã giảm giá" parentLink="list-coupon" parentPage="Mã giảm giá" />
            {loading ? (
                <LoadingSpin />
            ) : (
                <div className="edit-coupon">
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
                                            <InputField
                                                name="quantity"
                                                label="Số lượng"
                                                control={control}
                                                error={errors}
                                            />
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
                                        <Button
                                            type="submit"
                                            colorScheme="twitter"
                                            isLoading={loadingSubmit}
                                            disabled={loadingSubmit}
                                        >
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
            )}
        </motion.div>
    );
};

export default EditCoupon;
