import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData));
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Create account</h1>
                <p>Let's get you started sharing your links!</p>
            </div>
            <div>
                <label>Email address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Create password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>Confirm password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create new account</button>
            </div>
        </form>
    );
}

export default Register;