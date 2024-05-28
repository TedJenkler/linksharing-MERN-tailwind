import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [emailV, setEmailV] = useState(true);
    const [passV, setPassV] = useState(true);
    const [passMatch, setPassMatch] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let v = 0;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setEmailV(true);
            v += 1;
        } else {
            setEmailV(false);
        }
        if (formData.password.length >= 8) {
            setPassV(true);
            v += 1;
        } else {
            setPassV(false);
        }
        if (formData.password === formData.confirmPassword && formData.confirmPassword.length >= 8) {
            setPassMatch(true);
            v += 1;
        } else {
            setPassMatch(false);
        }
        if (v === 3) {
            try {
                await dispatch(registerUser(formData));
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (error) {
                console.error('Registration error:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className='m-8 mb-32 md:mx-40 md:w-3/5 md:my-48 md:flex md:flex-col md:items-center xl:w-[476px] xl:mx-0' onSubmit={handleSubmit}>
            <img className='h-10 w-44 mb-16 md:mb-12' src={logo} alt='logo' />
            <div className='md:bg-white md:rounded-xl md:p-10 md:w-full'>
                <div>
                    <h1 className='text-2xl font-bold text-darkgrey mb-2'>Create account</h1>
                    <p className='text-base text-grey mb-10'>Let's get you started sharing your links!</p>
                </div>
                <div>
                    <div className='flex flex-col mb-6'>
                        <label className={`text-xs text-darkgrey mb-1 ${!emailV ? 'text-red' : ''}`}>Email address</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconemail bg-no-repeat bg-[center_left_1rem] pb-1 focus:outline-purple ${!emailV ? 'outline outline-red' : ''}`}
                            placeholder='e.g alex@email.com'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {!emailV && <span className="text-red text-xs mt-1">Not valid email</span>}
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className={`text-xs text-darkgrey mb-1 ${!passV ? 'text-red' : ''}`}>Password</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1 focus:outline-purple ${!passV ? 'outline outline-red' : ''}`}
                            placeholder='At least 8 characters'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {!passV && <span className="text-red text-xs mt-1">Password is too short</span>}
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className={`text-xs text-darkgrey mb-1 ${!passMatch ? 'text-red' : ''}`}>Confirm Password</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1 focus:outline-purple ${!passMatch ? 'outline outline-red' : ''}`}
                            placeholder='Confirm your password'
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {!passMatch && <span className="text-red text-xs mt-1">Passwords don't match</span>}
                    </div>
                    <p className='mb-6 text-xs text-grey'>Password must contain at least 8 characters</p>
                    <button type='submit' className="w-full h-12 bg-purple text-white rounded-lg mb-6 hover:bg-hoverpurple">
                        Create new account
                    </button>
                </div>
                <div className='flex flex-col items-center md:flex-row md:gap-1 md:justify-center'>
                    <p className='text-base text-grey'>Already have an account?</p>
                    <Link to="/login" className='text-base text-purple'>Login</Link>
                </div>
            </div>
        </form>
    );
}

export default Register;