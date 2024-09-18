import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';
import upload from '../assets/images/upload.svg';
import changeimg from '../assets/images/changeimg.svg';
import { useDispatch } from 'react-redux';
import { updateUserImage } from '../features/user/userSlice';

const ImgUploader = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFile = files[0];
      const preview = URL.createObjectURL(newFile);
      const storageRef = ref(storage, `images/${newFile.name}`);

      try {
        await uploadBytes(storageRef, newFile);

        const downloadURL = await getDownloadURL(storageRef);

        setImagePreview(preview);

        dispatch(updateUserImage({ url: downloadURL, currentEmail: "tedjenkler@gmail.com" }));

      } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
      }
    }
  };

  return (
    <section className="img-uploader" aria-labelledby="profilePictureTitle">
      <h2 id="profilePictureTitle">Profile Picture</h2>
      
      <label htmlFor="imageUpload" className="label" aria-live="polite">
        <img className={imagePreview ? "changeimghover" : "changeimg"} src={changeimg} alt="Change image" />
        <img 
          src={imagePreview || upload} 
          alt={imagePreview ? "Preview of uploaded image" : "Click to upload an image"} 
          onClick={() => document.getElementById('imageUpload').click()}
          className="image-preview"
          role="button"
          tabIndex="0"
          aria-label="Click to upload a new profile picture"
        />
        <div className="overlay"></div>
      </label>
      
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input-file"
        aria-describedby="imageUploadHelp"
      />
      
      <p className="info-text" id="imageUploadHelp">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </section>
  );
};

export default ImgUploader;