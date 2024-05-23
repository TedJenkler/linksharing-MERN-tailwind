import React from 'react'
import linkempty from "../assets/emptylink.png"

function AddLinkPage() {
  return (
    <section className='m-4 bg-white rounded-xl py-6'>
        <div className='flex flex-col px-6'>
            <h1 className='text-2xl font-bold text-darkgrey mb-2'>Customize your links</h1>
            <p className='text-base font-grey text-grey mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>
            <button className='text-purple font-semibold text-base border border-purple py-2 w-full rounded-lg mb-6'>+ Add new link</button>
        </div>
        <div className='flex flex-col items-center py-12 bg-lightgrey rounded-xl px-5 mb-6 mx-6'>
            <img className='h-20 w-32 mb-6' src={linkempty} alt='emptylistimg' />
            <h2 className='text-2xl font-bold text-darkgrey mb-6'>Let´s get you started</h2>
            <p className='text-center text-base text-grey'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We´re here to help you share your profiles with everyone!</p>
        </div>
        <div className='border-t border-borders py-4'>
            <button className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6'>Save</button>
        </div>
    </section>
  )
}

export default AddLinkPage