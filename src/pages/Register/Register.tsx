import { useNavigate } from 'react-router-dom';

function Register() {
    const Navigate = useNavigate();
    console.log('page register');

    return (
        <div className="register">
            <p>Register</p>
        </div>
    );
}

export default Register;
