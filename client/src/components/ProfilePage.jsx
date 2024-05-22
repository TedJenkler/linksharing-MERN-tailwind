import React, { useState } from 'react'

function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    img: ''
  })
  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <section className='m-4 bg-white py-6 rounded-xl mb-20'>
        <h1 className='mx-6 text-2xl font-bold text-darkgrey mb-2'>Profile Details</h1>
        <p className='mx-6 text-base text-grey mb-10'>Add your details to create a personal touch to your profile.</p>
        <div className='p-5 mb-6 bg-lightgrey rounded-xl mx-6'>
          <p className='text-base text-grey mb-4'>Profile picture</p>
          <div className='mb-6'>
            img uploader here
          </div>
          <p className='text-xs text-grey'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
        <div className='flex flex-col p-5 bg-lightgrey rounded-xl mb-6 mx-6'>
          <label className='text-xs text-darkgrey mb-1'>First name*</label>
          <input onChange={handleChange} value={formData.firstName} name="firstName" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders'></input>
          <label className='text-xs text-darkgrey mb-1'>Last name*</label>
          <input onChange={handleChange} value={formData.lastName} name="lastName" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders'></input>
          <label className='text-xs text-darkgrey mb-1'>Email*</label>
          <input onChange={handleChange} value={formData.email} name="email" className='bg-white mb-4 h-12 rounded-lg px-4 border border-borders'></input>
        </div>
        <div className='border-t border-borders py-4'>
          <button className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6'>Save</button>
        </div>
    </section>
  )
}

export default ProfilePage