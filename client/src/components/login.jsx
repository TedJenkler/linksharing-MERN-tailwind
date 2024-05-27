import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [emailV, setEmailV] = useState(true); // Initialize as true
    const [passV, setPassV] = useState(true); // Initialize as true

    const handleSubmit = async (e) => {
        e.preventDefault();
        let v = 0;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setEmailV(true);
            v = v + 1;
        } else {
            setEmailV(false);
        }
        if (formData.password !== "") {
            setPassV(true);
            v = v + 1;
        } else {
            setPassV(false);
        }
        if (v === 2) {
            try {
                await dispatch(loginUser(formData));
                navigate('/app');
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/app');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className='m-8 mb-32 md:mx-40 md:my-48 md:flex md:flex-col md:items-center xl:w-[476px] xl:mx-0' onSubmit={handleSubmit}>
            <img className='h-10 w-44 mb-16' src={logo} alt='logo' />
            <div className='md:bg-white md:rounded-xl md:p-10'>
                <div>
                    <h1 className='text-2xl font-bold text-darkgrey mb-2'>Login</h1>
                    <p className='text-base text-grey mb-10'>Add your details below to get back into the app</p>
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
                        {!emailV && <span className="text-red text-xs relative bottom-8 left-48">Not valid email</span>}
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className={`text-xs text-darkgrey mb-1 ${!passV ? 'text-red' : ''}`}>Password</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] pb-1 focus:outline-purple ${!passV ? 'outline outline-red' : ''}`}
                            placeholder='Enter your password'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {!passV && <span className="text-red text-xs relative bottom-8 left-48">Not valid password</span>}
                    </div>
                    <button type='submit' className="w-full h-12 bg-purple text-white rounded-lg mb-6 hover:bg-hoverpurple">
                        Login
                    </button>
                </div>
                <div className='flex flex-col items-center xl:flex-row xl:justify-center xl:gap-1'>
                    <p className='text-base text-grey'>Don't have an account?</p>
                    <Link to="/register" className='text-base text-purple'>Create account</Link>
                </div>
            </div>
        </form>
    );
}

export default Login;