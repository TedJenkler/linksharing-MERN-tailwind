import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '../features/links/linksSlice';
import { getUserByToken } from '../features/user/userSlice';
import github from "../assets/github.png"
import arrow from "../assets/arrowright.png"

function Preview() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);
    console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(getUserByToken());
                setUser(res.payload)
            }catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        fetchData()
    }, [dispatch])

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

    console.log(list);

    return (
        <section className=''>
            <div className='flex justify-between px-6 py-4 gap-4 mb-20'>
                <button className='bg-white border border-purple text-purple font-semibold text-base py-2 w-full rounded-lg'>Back to Editor</button>
                <button className='bg-purple text-white text-base font-semibold py-2 w-full rounded-lg'>Share Link</button>
            </div>
            <div className='flex items-center justify-center mb-6'>
            <img className='h-24 w-24 rounded-full bg-black border-4 border-purple' src='' alt='profile' />
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

export default Preview;