import React, { useState, useEffect, useRef } from 'react';
import selectdown from '../assets/selectdown.svg';
import selectup from '../assets/selectup.svg';
import github from '../assets/githubdark.png';
import youtube from '../assets/youtubedark.png';
import linkedin from '../assets/linkedindark.png';
import devto from '../assets/devtodark.png';
import codewars from '../assets/codewarsdark.png';
import freecodecamp from '../assets/freecodecampdark.png';
import frontendmentor from '../assets/frontendmentordark.png';
import twitter from '../assets/twitterdark.png';
import facebook from '../assets/facebookdark.png';
import twitch from '../assets/twitchdark.png';
import gitlab from '../assets/gitlabdark.png';
import hashnode from '../assets/hashnodedark.png';
import overflow from '../assets/stackoverflowdark.png';

const CustomSelect = ({ handleChange, index, form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'GitHub', icon: github },
    { value: 'YouTube', icon: youtube },
    { value: 'LinkedIn', icon: linkedin },
    { value: 'Dev.to', icon: devto },
    { value: 'Codewars', icon: codewars },
    { value: 'freeCodeCamp', icon: freecodecamp },
    { value: 'Frontend Mentor', icon: frontendmentor },
    { value: 'Twitter', icon: twitter },
    { value: 'Facebook', icon: facebook },
    { value: 'Twitch', icon: twitch },
    { value: 'GitLab', icon: gitlab },
    { value: 'Hashnode', icon: hashnode },
    { value: 'StackOverflow', icon: overflow }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    handleChange(index, { target: { name: 'title', value: option.value } });
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

  const selectedOption = options.find(option => option.value === form.title);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div className="relative inline-block w-full mb-3">
        <div
          className={`appearance-none outline-none outline-gray-300 rounded-lg px-4 h-12 w-full pr-8 text-darkgrey cursor-pointer flex items-center justify-between outline-1 focus:outline-purple transition-shadow focus:shadow-custom `}
          onClick={toggleDropdown}
          tabIndex="0"
        >
          <div className="flex items-center">
            {selectedOption && <img src={selectedOption.icon} alt={`${selectedOption.value} icon`} className="h-5 w-5 mr-2" />}
            {selectedOption ? selectedOption.value : 'Select an option'}
          </div>
          <img
            src={isOpen ? selectup : selectdown}
            alt="Dropdown Icon"
            className="h-2 w-3 text-darkgrey transform"
          />
        </div>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto top-14 focus:ring focus:ring-purple-400 focus:ring-opacity-50">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
                onClick={() => handleOptionClick(option)}
              >
                <img src={option.icon} alt={`${option.value} icon`} className="h-5 w-5 mr-2" />
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;