import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import logo from "../assets/logo.png";

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData));
        } catch (error) {
            console.error('Registration error:', error);
        }
        setFormData({
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className='m-8 mb-32' onSubmit={handleSubmit}>
            <img className='h-10 w-44 mb-16' src={logo} alt='logo' />
            <div>
                <h1 className='text-2xl font-bold text-darkgrey mb-2'>Create account</h1>
                <p className='text-base text-grey mb-10'>Let's get you started sharing your links!</p>
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
                <label className='text-xs text-darkgrey mb-1'>Create password</label>
                <input
                    className='h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1 mb-6'
                    placeholder='At least 8 characters'
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label className='text-xs text-darkgrey mb-1'>Confirm password</label>
                <input
                    className='h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1 mb-6'
                    placeholder='At least 8 characters'
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <p className='text-xs text-darkgrey mb-6'>Password must contain at least 8 characters</p>
                <button type="submit" className="w-full h-12 bg-purple text-white rounded-lg mb-6">
                    Create new account
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-base text-grey'>Already have an account?</p>
                <p className='text-base text-purple'>Login</p>
            </div>
        </form>
    );
}

export default Register;
