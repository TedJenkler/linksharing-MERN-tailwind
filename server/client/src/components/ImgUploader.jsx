import React, { useState, useEffect } from 'react';
import { FieldArray, ErrorMessage, useFormikContext } from 'formik';
import upload from '../assets/images/upload.svg';

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
      const preview = URL.createObjectURL(firstImage);
      setImagePreview(preview);

      return () => {
        URL.revokeObjectURL(preview);
      };
    } else {
      setImagePreview(null);
    }
  }, [values.images]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFile = files[0];
      const preview = URL.createObjectURL(newFile);

      setFieldValue('images', [newFile]);
      setImagePreview(preview);
    }
  };

  return (
    <FieldArray name="images">
      {() => (
        <section className="img-uploader" aria-labelledby="profilePictureTitle">
          <h2 id="profilePictureTitle" className="img-uploader__title">Profile Picture</h2>
          
          <label htmlFor="imageUpload" className="img-uploader__label" aria-live="polite">
            <img 
              src={imagePreview || upload} 
              alt={imagePreview ? "Preview of uploaded image" : "Click to upload an image"} 
              onClick={() => document.getElementById('imageUpload').click()}
              className="img-uploader__image"
              role="button"
              tabIndex="0"
              aria-label="Click to upload a new profile picture"
            />
          </label>
          
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="img-uploader__input"
            aria-describedby="imageUploadHelp"
          />
          
          <ErrorMessage name="images" component="div" role="alert" />

          <p className="img-uploader__info" id="imageUploadHelp">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </section>
      )}
    </FieldArray>
  );
};

export default ImageUploader;