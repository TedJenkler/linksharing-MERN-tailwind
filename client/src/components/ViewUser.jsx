import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '../features/links/linksSlice';
import { getUserByEmail } from '../features/user/userSlice';
import githubIcon from "../assets/github.png";
import youtubeIcon from "../assets/youtube.png";
import linkedinIcon from "../assets/linkedin.png";
import devtoIcon from "../assets/devto.png";
import codewarsIcon from "../assets/codewars.png";
import freecodecampIcon from "../assets/freecodecamp.png";
import arrowIcon from "../assets/arrowright.png";
import { useParams } from 'react-router';

function ViewUser() {
    const dispatch = useDispatch();
    const { email } = useParams();
    const [links, setLinks] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await dispatch(getUserByEmail(email));
                setUser({ ...userResponse.payload, img: `data:image/jpeg;base64,${arrayBufferToBase64(userResponse.payload.img.data.data)}` });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchData();
    }, [dispatch, email]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const linksResponse = await dispatch(fetchLinks());
                setLinks(linksResponse.payload);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <section className='pt-10 md:pt-0'>
            <div className='md:bg-purple md:rounded-b-[32px] md:pt-6'>
                <div className='flex items-center justify-center mb-6 md:bg-white md:mb-0 md:mx-52 md:rounded-t-3xl md:mt-32 md:pt-12 md:px-14'>
                    {user && user.img && <img className='h-24 w-24 rounded-full bg-black border-4 border-purple' src={user.img} alt='profile' />}
                </div>
            </div>
            <div className='md:bg-white md:mx-52 md:rounded-b-3xl md:pb-12'>
                {user ? (
                    <div className='flex flex-col mb-14 items-center'>
                        <h1 className='mb-2 text-3xl font-bold text-darkgrey'>{user.firstname} {user.lastname}</h1>
                        <p className='text-base text-grey'>{user.email}</p>
                    </div>
                ) : (
                    <p>Loading user information...</p>
                )}
                <div className='flex flex-col items-center px-20'>
                    {links.length > 0 ? (
                        links.map((item, index) => {
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
            </div>
        </section>
    );
}

export default ViewUser;