import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.user.error)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [emailV, setEmailV] = useState(true);
    const [passV, setPassV] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let v = 0;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setEmailV(true);
            v += 1;
        } else {
            setEmailV(false);
        }
        if (formData.password !== "") {
            setPassV(true);
            v += 1;
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
        <form className='m-8 mb-32 md:mx-40 md:w-3/5 md:my-48 md:flex md:flex-col md:items-center xl:w-[476px] xl:mx-0' onSubmit={handleSubmit}>
            <img className='h-10 w-44 mb-16 md:mb-12' src={logo} alt='logo' />
            <div className='md:bg-white md:rounded-xl md:p-10 md:w-full'>
                <div>
                    <h1 className='text-2xl font-bold text-darkgrey mb-2'>Login</h1>
                    <p className='text-base text-grey mb-10'>Add your details below to get back into the app</p>
                </div>
                <div>
                    <div className='flex flex-col mb-6 relative'>
                        <label className={`text-xs text-darkgrey mb-1 ${!emailV ? 'text-red' : ''}`}>Email address</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconemail bg-no-repeat bg-[center_left_1rem] pb-1 focus:outline-purple ${!emailV ? 'outline outline-red' : ''}`}
                            placeholder='e.g alex@email.com'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {!emailV && <span className="text-red text-xs mt-1 xl:hidden xl:absolute">Can't be empty</span>}
                        {!emailV && <span className="hidden absolute text-red text-xs mt-1 xl:flex xl:right-4 xl:top-8">Can't be empty</span>}
                    </div>
                    <div className='flex flex-col mb-6 relative'>
                        <label className={`text-xs text-darkgrey mb-1 ${!passV ? 'text-red' : ''} ${error === "Unauthorized: Please check your credentials" ? 'text-red' : ''}`}>Password</label>
                        <input
                            className={`h-12 w-full border border-borders rounded-lg px-10 bg-iconpass bg-no-repeat bg-[center_left_1rem] focus:outline-purple ${!passV ? 'outline outline-red' : ''} ${error === "Unauthorized: Please check your credentials" ? 'outline outline-red' : ''}`}
                            placeholder='Enter your password'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {!passV && <span className="text-red text-xs mt-1 xl:hidden xl:absolute">Can't be empty</span>}
                        {error === "Unauthorized: Please check your credentials" && <span className="text-red text-xs mt-1 xl:hidden xl:absolute">Password dosen't match</span>}
                        {!passV && <span className="hidden absolute text-red text-xs mt-1 xl:flex xl:right-4 xl:top-8">Can't be empty</span>}
                        {error === "Unauthorized: Please check your credentials" && <span className="hidden absolute text-red text-xs mt-1 xl:flex xl:right-4 xl:top-8">Password dosen't match</span>}
                    </div>
                    <button type='submit' className="w-full h-12 bg-purple text-white rounded-lg mb-6 hover:bg-hoverpurple">
                        Login
                    </button>
                </div>
                <div className='flex flex-col items-center md:flex-row md:justify-center md:gap-1'>
                    <p className='text-base text-grey'>Don't have an account?</p>
                    <Link to="/register" className='text-base text-purple'>Create account</Link>
                </div>
            </div>
        </form>
    );
}

export default Login;