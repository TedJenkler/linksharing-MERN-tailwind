import React, { useState, useEffect } from 'react';
import { FieldArray, ErrorMessage, useFormikContext } from 'formik';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';
import upload from '../assets/images/upload.svg';
import changeimg from '../assets/images/changeimg.svg';

const ImageUploader = () => {
  const { values, setFieldValue } = useFormikContext();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (values.images && values.images.length > 0) {
      const firstImage = values.images[0];
      if (firstImage instanceof File) {
        const preview = URL.createObjectURL(firstImage);
        setImagePreview(preview);

        return () => {
          URL.revokeObjectURL(preview);
        };
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(null);
    }
  }, [values.images]);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFile = files[0];
      const preview = URL.createObjectURL(newFile);

      const storageRef = ref(storage, `images/${newFile.name}`);

      try {
        await uploadBytes(storageRef, newFile);

        const downloadURL = await getDownloadURL(storageRef);

        setFieldValue('images', [newFile]);
        setImagePreview(preview);

      } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
      }
    }
  };

  return (
    <FieldArray name="images">
      {() => (
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
          
          <ErrorMessage name="images" component="div" role="alert" />

          <p className="info-text" id="imageUploadHelp">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </section>
      )}
    </FieldArray>
  );
};

export default ImageUploader;