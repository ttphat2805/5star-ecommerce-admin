import { Button, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { E } from 'chart.js/dist/chunks/helpers.core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUserCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import images from '~/assets/images';

import Image from '~/components/Image';
import Loading from '~/components/Loading';
import Logo from '~/components/Logo';
import { addUser } from '~/features/user/userSlice';
import InputFieldEye from '~/layouts/components/CustomField/InputFieldEye';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { LoginType, ResponseType } from '~/utils/Types';
import { LoginSchema } from '~/utils/validationSchema';
import './Login.scss';

const initLoginForm = {
    username: '',
    password: '',
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // END STATE

    // INIT FORM
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginType>({ defaultValues: initLoginForm, resolver: yupResolver(LoginSchema) });

    const Navigate = useNavigate();
    const toast = useToast();

    // HANDLE LOGIC
    const handleSubmitLogin = (values: LoginType) => {
        setLoading(true);
        AuthService.signIn(values).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    if (
                        res?.data.user_info?.profile?.roles[1] === 'admin' ||
                        res?.data.user_info?.profile?.roles[2] === 'super_admin'
                    ) {
                        let accessToken = res?.data?.accessToken;
                        dispatch(addUser(res?.data?.user_info.profile));
                        if (accessToken) {
                            localStorage.setItem('access_token', accessToken);
                            Navigate('/');
                            setLoading(false);
                            toast({
                                position: 'top-right',
                                title: '????ng nh???p th??nh c??ng',
                                duration: 2000,
                                status: 'success',
                            });
                        }
                    } else {
                        toast({
                            position: 'top-right',
                            title: 'Ch??? c?? ng?????i qu???n tr??? m???i c?? th??? ????ng nh???p',
                            duration: 2000,
                            status: 'error',
                        });
                    }
                } else {
                    setLoading(false);
                    toast({
                        position: 'top-right',
                        title: 'T??i kho???n ho???c m???t kh???u kh??ng t???n t???i',
                        duration: 2000,
                        status: 'error',
                    });
                }
            },
            (err) => {
                setLoading(false);
                toast({
                    position: 'top-right',
                    title: 'T??i kho???n ho???c m???t kh???u kh??ng t???n t???i',
                    duration: 2000,
                    status: 'error',
                });
            },
        );
    };

    const HandleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-component flex justify-center h-screen overflow-x-hidden">
            <div className="bg-main hidden w-full max-h-screen  md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.vector_login} alt="" className="w-[80%] m-auto" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">
                                <Logo className="w-[300px]" />
                            </div>
                            <div className="login-text my-5 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5">????ng nh???p</h1>
                                <p className="text-primary font-semibold text-center text-lg">
                                    Ch??o m???ng b???n ?????n v???i 5Star <b>Admin</b>
                                </p>
                            </div>
                        </div>
                        <form className="max-w-[400px] m-auto" onSubmit={handleSubmit(handleSubmitLogin)}>
                            <div className="form-group">
                                <InputFieldIcon
                                    type="text"
                                    name="username"
                                    size="md"
                                    icon={<FiUserCheck />}
                                    borderRadius="10px"
                                    paddingY={7}
                                    control={control}
                                    error={errors}
                                    placeholder="T??n ????ng nh???p.."
                                />
                            </div>
                            <div className="form-group my-3">
                                <InputFieldEye
                                    name="password"
                                    control={control}
                                    error={errors}
                                    showPassword={showPassword}
                                    setShowPassword={HandleTogglePassword}
                                    placeholder="Nh???p m???t kh???u"
                                />
                            </div>
                            <div className="forgot-box flex justify-between">
                                {/* <Field name="rememberPassword">
                                            {(props: any) => {
                                                const { field } = props;
                                                return <Checkbox {...field}>Nh??? m???t kh???u</Checkbox>;
                                            }}
                                        </Field> */}
                                {/* <div className="forgot text-primary text-base font-semibold">
                                    <Link to="">Qu??n m???t kh???u ?</Link>
                                </div> */}
                            </div>
                            <div className="button-action w-full mt-5">
                                <Button
                                    type="submit"
                                    colorScheme="twitter"
                                    className="w-full py-6"
                                    isLoading={loading}
                                    disabled={loading}
                                >
                                    ????ng nh???p
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
