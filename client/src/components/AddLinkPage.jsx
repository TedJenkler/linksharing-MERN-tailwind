import React from 'react'
import linkempty from "../assets/emptylink.png"
import { useState } from 'react'
import drag from "../assets/drag.png"
import { useDispatch } from 'react-redux'
import { addLinks } from '../features/links/linksSlice'

function AddLinkPage() {
    const [linkForm, setLinkForm] = useState([])
    console.log(linkForm)
    const dispatch = useDispatch();

    const handleAdd = () => {
        setLinkForm(prevState => [
            ...prevState,
            { title: '', url: '' }
        ]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newLinkForm = [...linkForm];
        newLinkForm[index][name] = value;
        setLinkForm(newLinkForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addLinks(linkForm));
            setLinkForm([]);
        } catch (error) {
            console.error('AddLink error:', error);
        }
    };

  return (
    <section className='m-4 bg-white rounded-xl py-6'>
        <div className='flex flex-col px-6'>
            <h1 className='text-2xl font-bold text-darkgrey mb-2'>Customize your links</h1>
            <p className='text-base font-grey text-grey mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>
            <button onClick={handleAdd} className='text-purple font-semibold text-base border border-purple py-2 w-full rounded-lg mb-6'>+ Add new link</button>
        </div>
        {linkForm.length === 0 ? <div className='flex flex-col items-center py-12 bg-lightgrey rounded-xl px-5 mb-6 mx-6'>
            <img className='h-20 w-32 mb-6' src={linkempty} alt='emptylistimg' />
            <h2 className='text-2xl font-bold text-darkgrey mb-6'>Let´s get you started</h2>
            <p className='text-center text-base text-grey'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We´re here to help you share your profiles with everyone!</p>
        </div> : null}
        {linkForm.length > 0 ? linkForm.map((form, index) => {
            return (
            <form key={index} className='mx-6 bg-lightgrey p-5  mb-6 rounded-xl'>
                <div className='flex justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                        <img src={drag} alt='drag' />
                        <h3 className='text-base text-grey font-bold'>Link</h3>
                    </div>
                    <p className='text-base text-grey'>Remove</p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-xs text-darkgrey mb-1'>Platform</label>
                    <input type='text' name='title' value={form.title} onChange={(e) => {handleChange(index, e)}} className='mb-3 rounded-lg px-4'></input>
                </div>
                <div className='flex flex-col'>
                    <label className='text-xs text-darkgrey mb-1'>Link</label>
                    <input type='text' name='url' value={form.url} onChange={(e) => {handleChange(index, e)}} className='mb-3 rounded-lg px-4'></input>
                </div>
            </form>
            )
        }): null}
        <div className='border-t border-borders py-4'>
            <button onClick={handleSubmit} className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6'>Save</button>
        </div>
    </section>
  )
}

export default AddLinkPage