import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '../features/links/linksSlice';
import { getUserByToken } from '../features/user/userSlice';
import githubIcon from "../assets/github.png";
import youtubeIcon from "../assets/youtube.png";
import linkedinIcon from "../assets/linkedin.png";
import devtoIcon from "../assets/devto.png";
import codewarsIcon from "../assets/codewars.png";
import freecodecampIcon from "../assets/freecodecamp.png";
import arrowIcon from "../assets/arrowright.png";
import { Link } from 'react-router-dom';

function Preview() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(getUserByToken());
                setUser({ ...res.payload, img: `data:image/jpeg;base64,${arrayBufferToBase64(res.payload.img.data.data)}` });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        fetchData();
    }, [dispatch]);

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
        <section className=''>
            <div className='flex justify-between px-6 py-4 gap-4 mb-20'>
                <Link to="/app" className='bg-white text-center border item border-purple text-purple font-semibold text-base py-2 w-full rounded-lg'>Back to Editor</Link>
                <button className='bg-purple text-white text-base font-semibold py-2 w-full rounded-lg'>Share Link</button>
            </div>
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
                    list.map((item, index) => {
                        let icon, bgColor;

                        switch (item.title) {
                            case "GitHub":
                                icon = githubIcon;
                                bgColor = 'bg-black';
                                break;
                            case "YouTube":
                                icon = youtubeIcon;
                                bgColor = 'bg-red';
                                break;
                            case "LinkedIn":
                                icon = linkedinIcon;
                                bgColor = 'bg-blue';
                                break;
                            case "Dev.to":
                                icon = devtoIcon;
                                bgColor = 'bg-darkgrey';
                                break;
                            case "Codewars":
                                icon = codewarsIcon;
                                bgColor = 'bg-wine';
                                break;
                            case "freeCodeCamp":
                                icon = freecodecampIcon;
                                bgColor = 'bg-darkpurple';
                                break;
                            default:
                                icon = null;
                                bgColor = '';
                                break;
                        }

                        if (icon) {
                            return (
                                <a
                                    className={`py-3 mb-5 w-full text-white rounded-lg ${bgColor}`}
                                    href={item.url}
                                    key={index}
                                >
                                    <div className='flex justify-between items-center px-4'>
                                        <div className='flex items-center gap-1'>
                                            <img className='h-4 w-4' src={icon} alt={item.title} />
                                            {item.title}
                                        </div>
                                        <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                    </div>
                                </a>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>Loading links...</p>
                )}
            </div>
        </section>
    );
}

export default Preview;