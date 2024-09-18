import React from 'react';
import previewcontainer from '../assets/images/preview-section.svg'; 
import { useSelector } from 'react-redux';

function DisplayPreview() {
  const userState = useSelector((state) => state.user.userData);

  const hasProfileImage = !!userState.img;

  return (
    <aside className='display-preview'>
      <img 
        src={previewcontainer} 
        alt='Preview of the sections' 
        aria-hidden='true' 
      />
      {hasProfileImage && (
        <div className='profile'>
          <img 
            src={userState.img} 
            alt={`${userState.firstName} ${userState.lastName}'s profile`} 
            aria-label='User profile picture'
          />
        </div>
      )}
      {hasProfileImage && (
        <div className='name'>
          <p>{userState.firstName}</p>
          <p>{userState.lastName}</p>
        </div>
      )}
      {hasProfileImage && (
        <div className='email'>
          <p>{userState.email}</p>
        </div>
      )}
    </aside>
  );
}

export default DisplayPreview;