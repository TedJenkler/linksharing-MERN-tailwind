import { ReactComponent as LinkIcon } from '../assets/images/nav/link.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/nav/profile.svg';
import { ReactComponent as PreviewIcon } from '../assets/images/nav/preview.svg';
import smalllogo from '../assets/images/nav/logo.svg';
import logo from '../assets/images/nav/logomd.svg';

import { useState, useEffect } from 'react';

function Nav({ page, setPage }) {
  const [currentLogo, setCurrentLogo] = useState(smalllogo);

  const updateLogo = () => {
    if (window.innerWidth >= 768) {
      setCurrentLogo(logo);
    } else {
      setCurrentLogo(smalllogo);
    }
  };

  useEffect(() => {
    updateLogo();

    window.addEventListener('resize', updateLogo);

    return () => {
      window.removeEventListener('resize', updateLogo);
    };
  }, []);

  return (
    <header className="nav">
      <img src={currentLogo} alt="Company logo" className="logo-img" />

      <nav>
        <button
          onClick={() => setPage('links')}
          aria-label="Links"
          className={page === 'links' ? 'active' : ''}
        >
          <LinkIcon className="link-icon" />
          <p>Links</p>
        </button>

        <button
          onClick={() => setPage('profile')}
          aria-label="Profile"
          className={page === 'profile' ? 'active' : ''}
        >
          <ProfileIcon className="profile-icon" />
          <p>Profile Details</p>
        </button>
      </nav>

      <button className='preview' aria-label="Preview" onClick={() => console.log('Preview')}>
        <PreviewIcon className="preview-icon" />
        <p>Preview</p>
      </button>
    </header>
  );
}

export default Nav;