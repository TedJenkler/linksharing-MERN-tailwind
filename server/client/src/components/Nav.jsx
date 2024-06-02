import React from 'react'
import logo from "../assets/smalllogo.png"
import logomd from "../assets/logomd.png"
import link from "../assets/link.png"
import linkmd from "../assets/linkmd.png"
import linkactive from "../assets/linkactive.png"
import linkactivemd from "../assets/linkactivemd.png"
import profile from "../assets/profile.png"
import profilemd from "../assets/profilemd.png"
import profileactive from "../assets/profileactive.png"
import profileactivemd from "../assets/profileactivemd.png"
import preview from "../assets/preview.png"
import previewmd from "../assets/previewmd.png"
import { Link } from 'react-router-dom'

function Nav({togglePage, setTogglePage}) {
  return (
    <nav className='flex justify-between items-center py-4 px-6 bg-white md:m-6 md:rounded-xl'>
        <img className='h-8 md:hidden md:absolute' src={logo} alt='logo' />
        <img className='h-8 hidden absolute md:flex md:relative' src={logomd} alt='logo' />
        <div onClick={(e) => setTogglePage(!togglePage)} className='flex'>
            {togglePage === false ? <img className='md:hidden md:absolute' src={link} alt='link' /> : <img className='md:hidden md:absolute' src={linkactive} alt='link' />}
            {togglePage === false ? <img className='hidden absolute md:flex md:relative' src={linkmd} alt='link' /> : <img className='hidden absolute md:flex md:relative' src={linkactivemd} alt='link' />}
            {togglePage === false ? <img className='md:hidden md:absolute' src={profileactive} alt='profile'/> : <img className='md:hidden md:absolute' src={profile} alt='profile'/>}
            {togglePage === false ? <img className='hidden absolute md:flex md:relative' src={profileactivemd} alt='profile' /> : <img className='hidden absolute md:flex md:relative' src={profilemd} alt='profile' />}
        </div>
        <div>
          <Link to="/preview"><img className='h-10 md:hidden md:absolute' src={preview} alt='preview' /></Link>
          <Link to="/preview"><img className='h-10 hidden absolute md:flex md:relative' src={previewmd} alt='preview' /></Link>
        </div>
    </nav>
  )
}

export default Nav