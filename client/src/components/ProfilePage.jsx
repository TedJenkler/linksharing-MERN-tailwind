import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import emptyimg from "../assets/emptyimg.png"

function ProfilePage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    img: null
  });

  console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'img' ? files[0] : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(formData));
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        img: null
      });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <section className='m-4 bg-white py-6 rounded-xl mb-20'>
      <h1 className='mx-6 text-2xl font-bold text-darkgrey mb-2'>Profile Details</h1>
      <p className='mx-6 text-base text-grey mb-10'>Add your details to create a personal touch to your profile.</p>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className='p-5 mb-6 bg-lightgrey rounded-xl mx-6 md:flex md:justify-between md:items-center md:pb-0'>
          <p className='text-base text-grey mb-4 md:w-1/2'>Profile picture</p>
          <div className='mb-6'>
            <label htmlFor="fileInput"><img className='h-48 w-48' src={emptyimg} alt='emptyimg' /></label>
            <input id='fileInput' className='hidden' onChange={handleChange} name="img" type='file'></input>
          </div>
          <p className='text-xs text-grey md:w-1/4 md:ml-6'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
        <div className='flex flex-col p-5 bg-lightgrey rounded-xl mb-6 mx-6 md:mb-40'>
          <div className='md:flex md:justify-between md:items-center md:mb-3'>
            <label className='text-xs text-darkgrey mb-1 md:m-0'>First name*</label>
            <input onChange={handleChange} value={formData.firstname} name="firstname" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders md:w-1/2 md:m-0'></input>
          </div>
          <div className='md:flex md:justify-between md:items-center md:mb-3'>
            <label className='text-xs text-darkgrey mb-1 md:m-0'>Last name*</label>
            <input onChange={handleChange} value={formData.lastname} name="lastname" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders md:w-1/2 md:m-0'></input>
          </div>
          <div className='md:flex md:justify-between md:items-center md:mb-3'>
            <label className='text-xs text-darkgrey mb-1 md:m-0'>Email*</label>
            <input onChange={handleChange} value={formData.email} name="email" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders md:w-1/2 md:m-0'></input>
          </div>
        </div>
        <div className='border-t border-borders py-4 md:flex md:justify-end md:pt-8'>
          <button type="submit" className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6'>Save</button>
        </div>
      </form>
    </section>
  );
}

export default ProfilePage;
