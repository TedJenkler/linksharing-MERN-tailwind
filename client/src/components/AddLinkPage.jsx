import React, { useEffect, useState } from 'react';
import linkempty from "../assets/emptylink.png";
import drag from "../assets/drag.png";
import { useDispatch, useSelector } from 'react-redux';
import { addLinks, fetchLinks } from '../features/links/linksSlice';

function AddLinkPage() {
    const [linkForm, setLinkForm] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.links.loading);
    const error = useSelector(state => state.links.error);
    console.log(linkForm)

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
    };

    const handleDelete = (index) => {
        const newLinkForm = [...linkForm]
        newLinkForm.splice(index, 1)
        setLinkForm(newLinkForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addLinks(linkForm)).unwrap();
        } catch (error) {
            console.error('AddLink error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className='m-4 bg-white rounded-xl py-6'>
            <div className='flex flex-col px-6'>
                <h1 className='text-2xl font-bold text-darkgrey mb-2'>Customize your links</h1>
                <p className='text-base font-grey text-grey mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>
                <button onClick={handleAdd} className='text-purple font-semibold text-base border border-purple py-2 w-full rounded-lg mb-6'>+ Add new link</button>
            </div>
            {linkForm.length === 0 ? (
                <div className='flex flex-col items-center py-12 bg-lightgrey rounded-xl px-5 mb-6 mx-6'>
                    <img className='h-20 w-32 mb-6' src={linkempty} alt='emptylistimg' />
                    <h2 className='text-2xl font-bold text-darkgrey mb-6'>Let´s get you started</h2>
                    <p className='text-center text-base text-grey'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We´re here to help you share your profiles with everyone!</p>
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
                        {console.log('form.title:', form.title)}
                        <select name='title' value={form.title || 'github'} onChange={(e) => handleChange(index, e)}>
                            <option value='GitHub'>GitHub</option>
                            <option value='YouTube'>YouTube</option>
                            <option value='LinkedIn'>LinkedIn</option>
                            <option value='Dev.to'>Dev.to</option>
                            <option value='Codewars'>Codewars</option>
                            <option value='freeCodeCamp'>freeCodeCamp</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-xs text-darkgrey mb-1'>Link</label>
                        <input type='text' name='url' value={form.url} onChange={(e) => handleChange(index, e)} className='mb-3 rounded-lg px-4' />
                    </div>
                </form>
            ))}
            <div className='border-t border-borders py-4'>
                <button onClick={handleSubmit} className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6'>Save</button>
            </div>
        </section>
    );
}

export default AddLinkPage;