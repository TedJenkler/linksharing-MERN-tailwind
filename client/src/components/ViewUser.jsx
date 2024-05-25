import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '../features/links/linksSlice';
import { getUserByEmail } from '../features/user/userSlice';
import github from "../assets/github.png";
import arrow from "../assets/arrowright.png";
import { useParams } from 'react-router';

function ViewUser() {
    const dispatch = useDispatch();
    const { email } = useParams(); // Extract email from URL params
    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(getUserByEmail(email)); // Fetch user by email
                setUser({ ...res.payload, img: `data:image/jpeg;base64,${arrayBufferToBase64(res.payload.img.data.data)}` });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, [dispatch, email]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(fetchLinks());
                setList(res.payload);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    // Function to convert ArrayBuffer to base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <section className='pt-16'>
            <div className='flex items-center justify-center mb-6'>
                {user && user.img && <img className='h-24 w-24 rounded-full bg-black border-4 border-purple' src={user.img} alt='profile' />}
            </div>
            {user ? (
                <div className='flex flex-col mb-14 items-center'>
                    <h1 className='mb-2 text-3xl font-bold text-darkgrey'>{user.firstname} {user.lastname}</h1>
                    <p className='text-base text-grey'>{user.email}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
            <div className='flex flex-col items-center px-20'>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <a
                            className={`py-3 mb-5 w-full text-white rounded-lg ${item.title === "GitHub" ? 'bg-black' : item.title === "YouTube" ? 'bg-red' : item.title === "LinkedIn" ? 'bg-blue' : ''}`}
                            href={item.url}
                            key={index}
                        >
                            <div className='flex justify-between items-center px-4'>
                                <div className='flex items-center gap-1'>
                                    <img className='h-4 w-4' src={github} alt={item.title} />
                                    {item.title}
                                </div>
                                <img className='h-4 w-4' src={arrow} alt='arrow' />
                            </div>
                        </a>
                    ))
                ) : (
                    <p>Loading links...</p>
                )}
            </div>
        </section>
    );
}

export default ViewUser;