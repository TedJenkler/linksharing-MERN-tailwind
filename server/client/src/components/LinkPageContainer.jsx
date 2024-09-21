import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import drag from '../assets/images/drag.svg';
import CustomDropdown from './CustomDropdown';

const validationSchema = Yup.object({
  links: Yup.array().of(
    Yup.object({
      platform: Yup.string().required('Required'),
      url: Yup.string().url('Invalid URL').required('Required'),
    })
  )
  .required('Must have at least one link')
  .min(1, 'At least one link is required'),
});

const LinkPageContainer = () => {
  return (
    <main className="linkpage" aria-labelledby="linkpage-header">
      <header id="linkpage-header">
        <h1>Customize your links</h1>
        <p>Add, edit, or remove links below and share all your profiles with the world!</p>
      </header>

      <Formik
        initialValues={{ links: [{ platform: '', url: '' }] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="links">
              {({ remove, push }) => (
                <div>
                  <button
                    className="add"
                    type="button"
                    onClick={() => push({ platform: '', url: '' })}
                    aria-label="Add a new link"
                  >
                    + Add new link
                  </button>
                  {values.links.map((_, index) => (
                    <div className="link-container" key={index}>
                      <div className="control-container">
                        <div className="drag-control">
                          <img src={drag} alt="Drag control to reorder link" />
                          <p>Link #{index + 1}</p>
                        </div>
                        <button
                          className="remove"
                          type="button"
                          onClick={() => remove(index)}
                          aria-label={`Remove link ${index + 1}`}
                        >
                          Remove
                        </button>
                      </div>

                      <label htmlFor={`platform-${index}`}>Platform</label>
                      <CustomDropdown
                        value={values.links[index].platform}
                        onChange={(option) => setFieldValue(`links.${index}.platform`, option.value)}
                        ariaLabel={`Select platform for link ${index + 1}`}
                      />
                      <ErrorMessage
                        name={`links.${index}.platform`}
                        component="div"
                        role="alert"
                      />

                      <label htmlFor={`url-${index}`}>Link</label>
                      <Field
                        name={`links.${index}.url`}
                        id={`url-${index}`}
                        placeholder="Enter URL"
                        type="text"
                        aria-label={`URL for link ${index + 1}`}
                      />
                      <ErrorMessage
                        name={`links.${index}.url`}
                        component="div"
                        role="alert"
                      />
                    </div>
                  ))}
                  <div className='button-container'>
                    <button type="submit" className="submit">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default LinkPageContainer;