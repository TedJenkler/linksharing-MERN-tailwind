import React from 'react'

function ProfilePage() {
  return (
    <section className='m-4'>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
        <div>
          <p>Profile picture</p>
          <div>
            img uploader here
          </div>
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
        <div className='flex flex-col'>
          <label>First name*</label>
          <input></input>
          <label>Last name*</label>
          <input></input>
          <label>Email*</label>
          <input></input>
        </div>
        <div>
          <button>Save</button>
        </div>
    </section>
  )
}

export default ProfilePage