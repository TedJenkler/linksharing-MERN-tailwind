import React, { useState } from 'react';
import selectdown from "../assets/selectdown.svg";
import selectup from "../assets/selectup.svg";

const CustomSelect = ({ handleChange, index, form }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-full">
      <div className="relative inline-block w-full mb-3">
        <select
          className={`appearance-none outline outline-borders rounded-lg px-4 h-12 w-full pr-8 text-darkgrey ${isOpen ? '' : ''}`}
          name='title'
          value={form.title || 'github'}
          onChange={(e) => handleChange(index, e)}
          onClick={toggleDropdown}
          onBlur={toggleDropdown}
        >
          <option value='GitHub'>GitHub</option>
          <option value='YouTube'>YouTube</option>
          <option value='LinkedIn'>LinkedIn</option>
          <option value='Dev.to'>Dev.to</option>
          <option value='Codewars'>Codewars</option>
          <option value='freeCodeCamp'>freeCodeCamp</option>
          <option value='FrontendMentor'>Frontend Mentor</option>
          <option value='Twitter'>Twitter</option>
          <option value='Facebook'>Facebook</option>
          <option value='Twitch'>Twitch</option>
          <option value='GitLab'>Git Lab</option>
          <option value='Hashnode'>Hashnode</option>
          <option value='StackOverflow'>Stack Overflow</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <img
            src={isOpen ? selectup : selectdown}
            alt="Dropdown Icon"
            className="h-2 w-3 text-gray-500 transform"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;