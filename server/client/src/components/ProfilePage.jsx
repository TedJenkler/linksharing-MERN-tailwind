import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import emptyimg from "../assets/emptyimg.png";
import { fetchLinks } from '../features/links/linksSlice';
import github from "../assets/github.png"
import youtube from "../assets/youtube.png";
import linkedin from "../assets/linkedin.png";
import devto from "../assets/devto.png";
import codewars from "../assets/codewars.png";
import freecodecamp from "../assets/freecodecamp.png";
import frontendmentor from "../assets/frontendmentor.png";
import twitter from "../assets/twitter.png"
import facebook from "../assets/facebook.png"
import twitch from "../assets/twitch.png"
import gitlab from "../assets/gitlab.png"
import hashnode from "../assets/hashnode.png"
import overflow from "../assets/overflow.png"
import arrowIcon from "../assets/arrowright.png";
import { getUserByToken } from '../features/user/userSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    img: null
  });

  const [emailV, setEmailV] = useState(true);
  const [firstnameV, setFirstnameV] = useState(true);
  const [lastnameV, setLastnameV] = useState(true);
  const [list, setList] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await dispatch(fetchLinks());
            setList(res.payload);
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    };

    fetchData();
}, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let v = 0;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailV(true);
      v++;
    } else {
      setEmailV(false);
    }

    if (formData.firstname.trim() !== '') {
      setFirstnameV(true);
      v++;
    } else {
      setFirstnameV(false);
    }

    if (formData.lastname.trim() !== '') {
      setLastnameV(true);
      v++;
    } else {
      setLastnameV(false);
    }

    if (v === 3) {
      try {
        await dispatch(updateUser(formData));
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          img: null
        });
        alert("Your changes have been saved!");
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'img' ? files[0] : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await dispatch(getUserByToken());
            setUser({ ...res.payload, img: `data:image/jpeg;base64,${arrayBufferToBase64(res.payload.img.data.data)}` });
        }catch (error) {
            console.error('Error fetching user:', error)
        }
    }
    fetchData()
},[dispatch])

   // Function to convert ArrayBuffer to base64
   const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

  return (
    <div className='xl:flex xl:w-screen'>
      <div className='hidden absolute xl:flex xl:relative xl:bg-white xl:w-5/12 xl:rounded-xl xl:ml-6 xl:my-6 xl:py-6 xl:pt-24 xl:justify-center'>
        <div className='relative w-80 h-[631px] bg-frame bg-no-repeat bg-contain'>
        <img className='absolute h-[96px] w-[96px] rounded-full top-[63.7px] left-[104.5px] border-2 border-purple' src={user ? user.img : emptyimg} />
        <p className='absolute text-xs top-[192.5px] left-[48%] transform -translate-x-1/2 -translate-y-1/2'>{user ? user.firstname : null} {user ? user.lastname : null}</p>
        <p className='absolute text-xs top-[217.5px] left-[48%] transform -translate-x-1/2 -translate-y-1/2'>{user ? user.email : null}</p>
        {list ? list.length > 0 && list.slice(0, 5).map((form, index) => (
                        <div className='relative top-72 left-9 mb-5' key={index}>
                            {form.title === "GitHub" ? (
                                <div className='bg-black text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={github} alt='github' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "YouTube" ? (
                                <div className='bg-red text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={youtube} alt='youtube' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "LinkedIn" ? (
                                <div className='bg-blue text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={linkedin} alt='linkedin' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Dev.to" ? (
                                <div className='bg-grey text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={devto} alt='devto' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Codewars" ? (
                                <div className='bg-wine text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={codewars} alt='codewars' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "freeCodeCamp" ? (
                                <div className='bg-darkpurple text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={freecodecamp} alt='freecodecamp' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "FrontendMentor" ? (
                                <div className='bg-white text-darkgrey w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={frontendmentor} alt='frontendmentor' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Twitter" ? (
                                <div className='bg-twitter text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={twitter} alt='twitter' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Facebook" ? (
                                <div className='bg-facebook text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={facebook} alt='facebook' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Twitch" ? (
                                <div className='bg-twitch text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={twitch} alt='twitch' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "GitLab" ? (
                                <div className='bg-gitlab text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={gitlab} alt='gitlab' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "Hashnode" ? (
                                <div className='bg-hashnode text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={hashnode} alt='hashnode' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                            {form.title === "StackOverflow" ? (
                                <div className='bg-overflow text-white w-[237px] h-[44px] relative bottom-2 rounded-lg justify-between items-center flex px-5'>
                                    <div className='flex items-center h-full gap-1'>
                                        <img className='h-5 w-5' src={overflow} alt='Stack Overflow' />{form.title}
                                    </div>
                                    <img className='h-4 w-4' src={arrowIcon} alt='arrow' />
                                </div>
                            ) : null}
                        </div>
                    )) : null}
        </div>
      </div>
      <section className='m-4 bg-white py-6 rounded-xl mb-20 md:mx-6 xl:w-7/12 xl:m-6'>
        <h1 className='mx-6 text-2xl font-bold text-darkgrey mb-2 md:mx-10'>Profile Details</h1>
        <p className='mx-6 text-base text-grey mb-10 md:mx-10'>Add your details to create a personal touch to your profile.</p>
        <form className='' encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className='p-5 mb-6 bg-lightgrey rounded-xl mx-6 md:p-5 md:mx-10 md:flex md:justify-between md:items-center md:pb-0'>
            <p className='text-base text-grey mb-4 md:w-1/2'>Profile picture</p>
            <div className='mb-6'>
              <label htmlFor="fileInput"><img className='h-48 w-48' src={formData.img ? URL.createObjectURL(formData.img) : emptyimg} alt='profile' /></label>
              <input id='fileInput' className='hidden' onChange={handleChange} name="img" type='file' accept="image/png, image/jpeg"></input>
            </div>
            <p className='text-xs text-grey md:w-1/4 md:ml-6'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </div>
          <div className='flex flex-col p-5 bg-lightgrey rounded-xl mb-6 mx-6 md:mx-10 md:mb-40'>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!firstnameV ? 'text-red' : ''}`}>First name*</label>
              <input onChange={handleChange} value={formData.firstname} name="firstname" className={`bg-white mb-1 h-12 rounded-lg px-4 outline transition-shadow focus:outline-purple focus:shadow-custom outline-borders md:w-2/3 ${!firstnameV ? 'outline-red outline-1' : ''}`} placeholder="Enter your first name"></input>
              {!firstnameV && <span className="text-red text-xs mt-1 md:absolute md:right-4 top-3">First name can't be empty</span>}
            </div>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!lastnameV ? 'text-red' : ''}`}>Last name*</label>
              <input onChange={handleChange} value={formData.lastname} name="lastname" className={`bg-white mb-1 h-12 rounded-lg px-4 outline transition-shadow focus:outline-purple focus:shadow-custom outline-borders md:w-2/3 ${!lastnameV ? 'outline-red outline-1' : ''}`} placeholder="Enter your last name"></input>
              {!lastnameV && <span className="text-red text-xs mt-1 md:absolute md:right-4 top-3">Last name can't be empty</span>}
            </div>
            <div className='flex flex-col mb-6 md:flex-row md:w-full md:items-center md:mb-3 md:relative'>
              <label className={`text-xs text-darkgrey mb-1 md:w-1/3 ${!emailV ? 'text-red' : ''}`}>Email*</label>
              <input onChange={handleChange} value={formData.email} name="email" className={`bg-white mb-1 h-12 rounded-lg px-4 outline transition-shadow focus:outline-purple focus:shadow-custom outline-borders md:w-2/3 ${!emailV ? 'outline-red outline-1' : ''}`} placeholder="Enter your email"></input>
              {!emailV && <span className="text-red text-xs mt-1 md:absolute md:right-4 top-3">Please enter a valid email</span>}
            </div>
          </div>
          <div className='border-t border-borders py-4 md:flex md:justify-end md:pt-8'>
            <button type="submit" className='bg-purple text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6 hover:bg-hoverpurple'>Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProfilePage;