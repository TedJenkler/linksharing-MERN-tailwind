/*import React, { useEffect, useState } from 'react';
import linkempty from "../assets/emptylink.png";
import emptylinkmd from "../assets/emptylinkmd.png"
import drag from "../assets/drag.png";
import { useDispatch } from 'react-redux';
import { addLinks, fetchLinks } from '../features/links/linksSlice';
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
import CustomSelect from './CustomSelect';

function AddLinkPage() {
    const [linkForm, setLinkForm] = useState([]);
    const [user, setUser] = useState(null)
    const [errorField, setErrorField] = useState(null);
    const dispatch = useDispatch();

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

    console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const links = await dispatch(fetchLinks()).unwrap();
                setLinkForm(links);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAdd = () => {
        setLinkForm(prevState => [
            ...prevState,
            { title: 'GitHub', url: '' }
        ]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newLinkForm = [...linkForm];
        newLinkForm[index][name] = value;
        setLinkForm(newLinkForm);
        setErrorField(null);
    };

    const handleDelete = (index) => {
        const newLinkForm = [...linkForm]
        newLinkForm.splice(index, 1)
        setLinkForm(newLinkForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyIndex = linkForm.findIndex(form => form.title === '' || form.url === '');
        if (emptyIndex !== -1) {
            setErrorField(emptyIndex);
        } else {
            try {
                await dispatch(addLinks(linkForm)).unwrap();
            } catch (error) {
                console.error('AddLink error:', error);
            }
        }
    };

    // Function to convert ArrayBuffer to base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e, dropIndex) => {
        const dragIndex = e.dataTransfer.getData("index");
        const newLinkForm = [...linkForm];
        const draggedItem = newLinkForm[dragIndex];
    
        // Remove the dragged item from its original position
        newLinkForm.splice(dragIndex, 1);
    
        // Insert the dragged item at the drop position
        newLinkForm.splice(dropIndex, 0, draggedItem);
    
        setLinkForm(newLinkForm);
    };

    return (
        <div className='xl:flex xl:w-screen'>
            <div className='hidden absolute xl:flex xl:relative xl:bg-white xl:w-5/12 xl:rounded-xl xl:ml-6 xl:my-6 xl:py-6 xl:pt-24 xl:justify-center'>
                <div className='relative w-80 h-[631px] bg-frame bg-no-repeat bg-contain'>
                <img className='absolute h-[96px] w-[96px] rounded-full top-[63.7px] left-[104.5px] border-2 border-purple' src={user ? user.img : null} />
                <p className='absolute text-xs top-[192.5px] left-[48%] transform -translate-x-1/2 -translate-y-1/2'>{user ? user.firstname : null} {user ? user.lastname : null}</p>
                <p className='absolute text-xs top-[217.5px] left-[48%] transform -translate-x-1/2 -translate-y-1/2'>{user ? user.email : null}</p>
                {linkForm.length > 0 && linkForm.slice(0, 5).map((form, index) => (
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
                    ))}
                </div>
            </div>
            <section className='m-4 bg-white py-6 rounded-xl mb-20 md:mx-6 xl:w-7/12 xl:m-6'>
                <section className='m-4 bg-white py-6 rounded-xl mb-20'>
                    <div className='flex flex-col px-6'>
                        <h1 className='text-2xl font-bold text-darkgrey mb-2'>Customize your links</h1>
                        <p className='text-base font-grey text-grey mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>
                        <button onClick={handleAdd} className='text-purple font-semibold text-base border border-purple py-2 w-full rounded-lg mb-6 hover:bg-lightpurple'>+ Add new link</button>
                    </div>
                    {linkForm.length === 0 ? (
                        <div className='flex flex-col items-center py-12 bg-lightgrey rounded-xl px-5 mb-6'>
                            <img className='h-20 w-32 mb-6 md:hidden md:absolute' src={linkempty} alt='emptylistimg' />
                            <img className='h-48 w-60 mb-6 hidden absolute md:flex md:relative' src={emptylinkmd} alt='emptylistimg' />
                            <h2 className='text-2xl font-bold text-darkgrey mb-6'>Let´s get you started</h2>
                            <p className='text-center text-base text-grey md:mx-14'>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We´re here to help you share your profiles with everyone!</p>
                        </div>
                    ) : null}
                    {linkForm.length > 0 && linkForm.map((form, index) => (
                        <div key={index}
                            className='mx-6 bg-lightgrey p-5 mb-6 rounded-xl'
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                        <div className='flex justify-between mb-3'>
                            <div className='flex items-center gap-2'>
                                <img src={drag} alt='drag' />
                                <h3 className='text-base text-grey font-bold'>Link #{index + 1}</h3>
                            </div>
                            <p onClick={() => handleDelete(index)} className='text-base text-grey'>Remove</p>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-darkgrey mb-1'>Platform</label>
                            <CustomSelect handleChange={handleChange} index={index} form={form} />
                        </div>
                        <div className='flex flex-col'>
                            <label className={`text-xs text-darkgrey mb-1 ${errorField === index && (form.url === '' ? 'text-red' : '')}`}>Link</label>
                            <input className={`outline outline-borders bg-link bg-no-repeat bg-[center_left_1rem] rounded-lg px-10 h-12 transition-shadow focus:outline-purple focus:shadow-custom mb-3 ${errorField === index && (form.url === '' ? 'outline-red outline-1' : '')}`} type='text' name='url' value={form.url} onChange={(e) => handleChange(index, e)} />
                            {errorField === index && <span className='text-red text-xs'>This field is required</span>}
                        </div>
                    </div>
                    ))}
                    <div className='border-t flex border-borders py-4 justify-center md:justify-end'>
                        {linkForm.length > 0 ? <button onClick={handleSubmit} className='bg-purple text-white text-base py-2 px-28 rounded-lg mx-6 md:px-6 hover:bg-hoverpurple'>Save</button> : <button onClick={handleSubmit} className='bg-purple/25 text-white text-base py-2 px-32 rounded-lg mx-6 md:px-6' disabled={true}>Save</button> }
                    </div>
                </section>
            </section>
        </div>
    );
}

export default AddLinkPage;  */