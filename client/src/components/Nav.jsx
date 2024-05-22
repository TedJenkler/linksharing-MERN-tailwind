import React from 'react'
import logo from "../assets/smalllogo.png"
import link from "../assets/link.png"
import linkactive from "../assets/linkactive.png"
import profile from "../assets/profile.png"
import profileactive from "../assets/profileactive.png"
import preview from "../assets/preview.png"

function Nav({togglePage, setTogglePage}) {
  return (
    <nav className='flex justify-between items-center py-4 px-6 bg-white'>
        <img className='h-8' src={logo} alt='logo' />
        <div onClick={(e) => setTogglePage(!togglePage)} className='flex'>
            {togglePage === false ? <img src={link} alt='link' /> : <img src={linkactive} alt='link' />}
            {togglePage === false ? <img src={profileactive} alt='profile'/> : <img src={profile} alt='profile'/>}
        </div>
        <img className='h-10' src={preview} alt='preview' />
    </nav>
  )
}

export default Nav