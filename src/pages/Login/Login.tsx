import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import { AuthService } from '~/services';

const initDataForm = {
    username: '',
    password: '',
};

const Login = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState(initDataForm);

    const onInputChange = (e: Event | any) => {
        let { value, name } = e.target;
        let FormValueNew = { ...formValue, [name]: value };
        setFormValue(FormValueNew);
    };

    const submitForm = (e: Event | any) => {
        e.preventDefault();
    };

    return (
        <div className="login">
            <h1>LOGIN</h1>
        </div>
    );
};

export default Login;
