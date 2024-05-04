import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(formData));
            navigate('/app');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className='m-8 mb-32' onSubmit={handleSubmit}>
            <img className='h-10 w-44 mb-16' src={logo} alt='logo' />
            <div>
                <h1 className='text-2xl font-bold text-darkgrey mb-2'>Login</h1>
                <p className='text-base text-grey mb-10'>Add your details below to get back into the app</p>
            </div>
            <div>
                <div className='flex flex-col mb-6'>
                    <label className='text-xs text-darkgrey mb-1'>Email address</label>
                    <input
                        className='h-12 w-full border border-borders rounded-lg px-10 bg-iconemail bg-no-repeat bg-[center_left_1rem] pb-1'
                        placeholder='e.g alex@email.com'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-6'>
                    <label className='text-xs text-darkgrey mb-1'>Password</label>
                    <input
                        className='h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1'
                        placeholder='Enter your password'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="w-full h-12 bg-purple text-white rounded-lg mb-6">
                    Login
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-base text-grey'>Don't have an account?</p>
                <Link to="/register" className='text-base text-purple'>Create account</Link>
            </div>
        </form>
    );
}

export default Login;
