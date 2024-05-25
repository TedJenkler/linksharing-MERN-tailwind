import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '../features/links/linksSlice';
import github from "../assets/github.png"
import arrow from "../assets/arrowright.png"

function Preview() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);

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
            <img />
            <h1></h1>
            <p></p>
            <div className='flex flex-col items-center px-20'>
                {list.map((item, index) => (
                    <>
                        {item.title === "GitHub" ? <a className='py-3 mb-5 w-full bg-black text-white rounded-lg' href={item.url} key={index}><div className='flex justify-between items-center px-4'><div className='flex items-center gap-1'><img className='h-4 w-4' src={github} alt='github' />{item.title}</div><img className='h-4 w-4' src={arrow} alt='arrow' /></div></a> : null}
                        {item.title === "YouTube" ? <a className='py-3 mb-5 w-full bg-red text-white rounded-lg' href={item.url} key={index}><div className='flex justify-between items-center px-4'><div className='flex items-center gap-1'><img className='h-4 w-4' src={github} alt='github' />{item.title}</div><img className='h-4 w-4' src={arrow} alt='arrow' /></div></a> : null}
                        {item.title === "LinkedIn" ? <a className='py-3 mb-5 w-full bg-blue text-white rounded-lg' href={item.url} key={index}><div className='flex justify-between items-center px-4'><div className='flex items-center gap-1'><img className='h-4 w-4' src={github} alt='github' />{item.title}</div><img className='h-4 w-4' src={arrow} alt='arrow' /></div></a> : null}
                    </>
                ))}
            </div>
        </section>
    );
}

export default Preview;