import React, { useEffect, useState } from 'react';
import linkempty from "../assets/emptylink.png";
import emptylinkmd from "../assets/emptylinkmd.png"
import drag from "../assets/drag.png";
import { useDispatch, useSelector } from 'react-redux';
import { addLinks, fetchLinks } from '../features/links/linksSlice';
import desktopimg from "../assets/desktopimg.png"

function AddLinkPage() {
    const [linkForm, setLinkForm] = useState([]);
    const [errorField, setErrorField] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.links.loading);
    const error = useSelector(state => state.links.error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const links = await dispatch(fetchLinks()).unwrap();
                setLinkForm(links);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAdd = () => {
        setLinkForm(prevState => [
            ...prevState,
            { title: 'GitHub', url: '' }
        ]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newLinkForm = [...linkForm];
        newLinkForm[index][name] = value;
        setLinkForm(newLinkForm);
        setErrorField(null);
    };

    const handleDelete = (index) => {
        const newLinkForm = [...linkForm]
        newLinkForm.splice(index, 1)
        setLinkForm(newLinkForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyIndex = linkForm.findIndex(form => form.title === '' || form.url === '');
        if (emptyIndex !== -1) {
            setErrorField(emptyIndex);
        } else {
            try {
                await dispatch(addLinks(linkForm)).unwrap();
            } catch (error) {
                console.error('AddLink error:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='xl:flex xl:w-screen'>
            <div className='hidden absolute xl:flex xl:relative xl:bg-white xl:w-5/12 xl:rounded-xl xl:ml-6 xl:my-6 xl:py-6 xl:items-center xl:justify-center'>
                <img className='w-80 h-[631px]' src={desktopimg} alt='design' />
            </div>
            <section className='m-4 bg-white py-6 rounded-xl mb-20 xl:w-7/12 xl:m-6'>
                <section className='m-4 bg-white py-6 rounded-xl mb-20'>
                    <div className='flex flex-col px-6'>
                        <h1 className='text-2xl font-bold text-darkgrey mb-2'>Customize your links</h1>
                        <p className='text-base font-grey text-grey mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>
                        <button onClick={handleAdd} className='text-purple font-semibold text-base border border-purple py-2 w-full rounded-lg mb-6 hover:bg-lightpurple'>+ Add new link</button>
                    </div>
                    {linkForm.length === 0 ? (
                        <div className='flex flex-col items-center py-12 bg-lightgrey rounded-xl px-5 mb-6'>
                            <img className='h-20 w-32 mb-6 md:hidden md:absolute' src={linkempty} alt='emptylistimg' />
                            <img className='h-48 w-60 mb-6 hidden absolute md:flex md:relative' src={emptylinkmd} alt='emptylistimg' />
                            <h2 className='text-2xl font-bold text-darkgrey mb-6'>Let´s get you started</h2>
                            <p className='text-center text-base text-grey md:mx-14'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We´re here to help you share your profiles with everyone!</p>
                        </div>
                    ) : null}
                    {linkForm.length > 0 && linkForm.map((form, index) => (
                        <form key={index} className='mx-6 bg-lightgrey p-5 mb-6 rounded-xl'>
                            <div className='flex justify-between mb-3'>
                                <div className='flex items-center gap-2'>
                                    <img src={drag} alt='drag' />
                                    <h3 className='text-base text-grey font-bold'>Link #{index + 1}</h3>
                                </div>
                                <p onClick={() => handleDelete(index)} className='text-base text-grey'>Remove</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-xs text-darkgrey mb-1'>Platform</label>
                                <select className='outline outline-borders rounded-lg px-4 h-12 mb-3' name='title' value={form.title || 'github'} onChange={(e) => handleChange(index, e)}>
                                    <option value='GitHub'>GitHub</option>
                                    <option value='YouTube'>YouTube</option>
                                    <option value='LinkedIn'>LinkedIn</option>
                                    <option value='Dev.to'>Dev.to</option>
                                    <option value='Codewars'>Codewars</option>
                                    <option value='freeCodeCamp'>freeCodeCamp</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label className={`text-xs text-darkgrey mb-1 ${errorField === index && (form.url === '' ? 'text-red' : '')}`}>Link</label>
                                <input className={`outline outline-borders rounded-lg px-4 h-12 mb-3 ${errorField === index && (form.url === '' ? 'outline-red' : '')}`} type='text' name='url' value={form.url} onChange={(e) => handleChange(index, e)} />
                                {errorField === index && <span className='text-red text-xs'>This field is required</span>}
                            </div>
                        </form>
                    ))}
                    <div className='border-t flex border-borders py-4 justify-center md:justify-end'>
                        {linkForm.length > 0 ? <button onClick={handleSubmit} className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6 hover:bg-hoverpurple'>Save</button> : <button onClick={handleSubmit} className='bg-purple/25 text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6' disabled={true}>Save</button> }
                    </div>
                </section>
            </section>
        </div>
    );
}

export default AddLinkPage;