import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import emptyimg from "../assets/emptyimg.png";
import desktopimg from "../assets/desktopimg.png";

function ProfilePage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    img: null
  });

  const [emailV, setEmailV] = useState(true);
  const [firstnameV, setFirstnameV] = useState(true);
  const [lastnameV, setLastnameV] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let v = 0;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailV(true);
      v++;
    } else {
      setEmailV(false);
    }

    if (formData.firstname.trim() !== '') {
      setFirstnameV(true);
      v++;
    } else {
      setFirstnameV(false);
    }

    if (formData.lastname.trim() !== '') {
      setLastnameV(true);
      v++;
    } else {
      setLastnameV(false);
    }

    if (v === 3) {
      try {
        await dispatch(updateUser(formData));
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          img: null
        });
        alert("Your changes have been saved!");
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'img' ? files[0] : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  return (
    <div className='xl:flex xl:w-screen'>
      <div className='hidden absolute xl:flex xl:relative xl:bg-white xl:w-5/12 xl:rounded-xl xl:ml-6 xl:my-6 xl:py-6 xl:items-center xl:justify-center'>
        <img className='w-80 h-[631px]' src={desktopimg} alt='design' />
      </div>
      <section className='m-4 bg-white py-6 rounded-xl mb-20 md:mx-6 xl:w-7/12 xl:m-6'>
        <h1 className='mx-6 text-2xl font-bold text-darkgrey mb-2 md:mx-10'>Profile Details</h1>
        <p className='mx-6 text-base text-grey mb-10 md:mx-10'>Add your details to create a personal touch to your profile.</p>
        <form className='' encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className='p-5 mb-6 bg-lightgrey rounded-xl mx-6 md:p-5 md:mx-10 md:flex md:justify-between md:items-center md:pb-0'>
            <p className='text-base text-grey mb-4 md:w-1/2'>Profile picture</p>
            <div className='mb-6'>
              <label htmlFor="fileInput"><img className='h-48 w-48' src={formData.img ? URL.createObjectURL(formData.img) : emptyimg} alt='profile' /></label>
              <input id='fileInput' className='hidden' onChange={handleChange} name="img" type='file' accept="image/png, image/jpeg"></input>
            </div>
            <p className='text-xs text-grey md:w-1/4 md:ml-6'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </div>
          <div className='flex flex-col p-5 bg-lightgrey rounded-xl mb-6 mx-6 md:mx-10 md:mb-40'>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!firstnameV ? 'text-red' : ''}`}>First name*</label>
              <input onChange={handleChange} value={formData.firstname} name="firstname" className={`bg-white mb-1 h-12 rounded-lg px-4 border border-borders md:w-2/3 focus:outline-none ${!firstnameV ? 'border-red' : ''}`} placeholder="Enter your first name"></input>
              {!firstnameV && <span className="text-red text-xs mt-1 md:absolute md:right-2 top-3">First name can't be empty</span>}
            </div>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!lastnameV ? 'text-red' : ''}`}>Last name*</label>
              <input onChange={handleChange} value={formData.lastname} name="lastname" className={`bg-white mb-1 h-12 rounded-lg px-4 border border-borders md:w-2/3 focus:outline-none ${!lastnameV ? 'border-red' : ''}`} placeholder="Enter your last name"></input>
              {!lastnameV && <span className="text-red text-xs mt-1 md:absolute md:right-2 top-3">Last name can't be empty</span>}
            </div>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!emailV ? 'text-red' : ''}`}>Email*</label>
              <input onChange={handleChange} value={formData.email} name="email" className={`bg-white mb-1 h-12 rounded-lg px-4 border border-borders md:w-2/3 focus:outline-none ${!emailV ? 'border-red' : ''}`} placeholder="Enter your email"></input>
              {!emailV && <span className="text-red text-xs mt-1 md:absolute md:right-2 top-3">Please enter a valid email</span>}
            </div>
          </div>
          <div className='border-t border-borders py-4 md:flex md:justify-end md:pt-8'>
            <button type="submit" className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6 hover:bg-hoverpurple'>Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProfilePage;