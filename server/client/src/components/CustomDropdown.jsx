import React, { useState, useRef, useEffect } from 'react';
import arrow from '../assets/images/arrow.svg';
import { ReactComponent as GithubIcon } from '../assets/images/icons/github.svg';
import { ReactComponent as FrontendMentorIcon } from '../assets/images/icons/frontendmentor.svg';
import { ReactComponent as TwitterIcon } from '../assets/images/icons/twitter.svg';
import { ReactComponent as LinkedInIcon } from '../assets/images/icons/linkedin.svg';
import { ReactComponent as YouTubeIcon } from '../assets/images/icons/youtube.svg';
import { ReactComponent as FacebookIcon } from '../assets/images/icons/facebook.svg';
import { ReactComponent as TwitchIcon } from '../assets/images/icons/twitch.svg';
import { ReactComponent as DevToIcon } from '../assets/images/icons/devto.svg';
import { ReactComponent as CodewarsIcon } from '../assets/images/icons/codewars.svg';
import { ReactComponent as FreeCodeCampIcon } from '../assets/images/icons/freecodecamp.svg';
import { ReactComponent as GitLabIcon } from '../assets/images/icons/gitlab.svg';
import { ReactComponent as HashnodeIcon } from '../assets/images/icons/hashnode.svg';
import { ReactComponent as StackOverflowIcon } from '../assets/images/icons/stackoverflow.svg';

const CustomDropdown = ({ ariaLabel, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'github', label: 'GitHub', icon: <GithubIcon /> },
    { value: 'frontendmentor', label: 'Frontend Mentor', icon: <FrontendMentorIcon /> },
    { value: 'twitter', label: 'Twitter', icon: <TwitterIcon /> },
    { value: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon /> },
    { value: 'youtube', label: 'YouTube', icon: <YouTubeIcon /> },
    { value: 'facebook', label: 'Facebook', icon: <FacebookIcon /> },
    { value: 'twitch', label: 'Twitch', icon: <TwitchIcon /> },
    { value: 'devto', label: 'DEV.to', icon: <DevToIcon /> },
    { value: 'codewars', label: 'Codewars', icon: <CodewarsIcon /> },
    { value: 'freecodecamp', label: 'freeCodeCamp', icon: <FreeCodeCampIcon /> },
    { value: 'gitlab', label: 'GitLab', icon: <GitLabIcon /> },
    { value: 'hashnode', label: 'Hashnode', icon: <HashnodeIcon /> },
    { value: 'stackoverflow', label: 'StackOverflow', icon: <StackOverflowIcon /> },
  ];

  const selected = options.find(option => option.value === value) || options[0];

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <div className="dropdown-group">
          {selected.icon}
          <span>{selected.label}</span>
        </div>
        <img
          src={arrow}
          alt="Toggle dropdown"
          className={`arrow-icon ${isOpen ? 'open' : ''}`}
        />
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'visible' : ''}`} role="listbox" aria-label="Select an option">
        {options.map((option) => (
          <li
            key={option.value}
            role="option"
            aria-selected={selected.value === option.value}
            onClick={() => handleSelect(option)}
            className={`dropdown-item ${selected.value === option.value ? 'selected' : ''}`}
          >
            <div className="dropdown-group">
              {option.icon}
              <span>{option.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;