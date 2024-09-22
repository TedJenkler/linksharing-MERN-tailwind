import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import drag from '../assets/images/drag.svg';
import CustomDropdown from './CustomDropdown';
import linkIcon from '../assets/link.svg';
import NoLinks from './NoLinks';

const urlPatterns = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/,
  youtube: /^https:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_-]+$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+$/,
  devto: /^https:\/\/(www\.)?dev\.to\/[a-zA-Z0-9_]+$/,
  codewars: /^https:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+$/,
  freecodecamp: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+$/,
  gitlab: /^https:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+$/,
  hashnode: /^https:\/\/(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+$/,
  stackoverflow: /^https:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+$/,
};

const validationSchema = Yup.object({
  links: Yup.array().of(
    Yup.object({
      platform: Yup.string().required('Platform is required'),
      url: Yup.string()
        .required('URL is required')
        .test('is-valid-url', 'Invalid URL format', function (value) {
          const { platform } = this.parent;
          const pattern = urlPatterns[platform];
          return pattern ? pattern.test(value) : true;
        }),
    })
  ).required('Must have at least one link').min(1, 'At least one link is required'),
});

const LinkPageContainer = () => {
  return (
    <main className="linkpage" aria-labelledby="linkpage-header">
      <header id="linkpage-header">
        <h1>Customize your links</h1>
        <p>Add, edit, or remove links below and share all your profiles with the world!</p>
      </header>

      <Formik
        initialValues={{ links: [] }}
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
                    onClick={() => push({ platform: 'github', url: '' })}
                    aria-label="Add a new link"
                  >
                    + Add new link
                  </button>

                  {values.links.length === 0 ? (
                    <NoLinks />
                  ) : (
                    values.links.map((link, index) => (
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
                          value={link.platform || 'github'}
                          onChange={(option) => setFieldValue(`links.${index}.platform`, option.value)}
                          ariaLabel={`Select platform for link ${index + 1}`}
                        />
                        <ErrorMessage
                          name={`links.${index}.platform`}
                          component="div"
                          role="alert"
                        />

                        <label htmlFor={`url-${index}`}>Link</label>
                        
                        <div className="input-with-icon">
                          <img src={linkIcon} alt="Link icon" className="link-icon" />
                          <Field
                            name={`links.${index}.url`}
                            id={`url-${index}`}
                            placeholder={
                              link.platform === 'github' ? "e.g. https://www.github.com/your-username" :
                              link.platform === 'frontendmentor' ? "e.g. https://www.frontendmentor.io/profile/your-username" :
                              link.platform === 'linkedin' ? "e.g. https://www.linkedin.com/in/your-profile" :
                              link.platform === 'twitter' ? "e.g. https://twitter.com/your-profile" :
                              link.platform === 'youtube' ? "e.g. https://youtube.com/c/your-channel" :
                              link.platform === 'facebook' ? "e.g. https://facebook.com/your-profile" :
                              link.platform === 'twitch' ? "e.g. https://twitch.tv/your-profile" :
                              link.platform === 'devto' ? "e.g. https://dev.to/your-profile" :
                              link.platform === 'codewars' ? "e.g. https://www.codewars.com/users/your-username" :
                              link.platform === 'freecodecamp' ? "e.g. https://www.freecodecamp.org/your-username" :
                              link.platform === 'gitlab' ? "e.g. https://gitlab.com/your-username" :
                              link.platform === 'hashnode' ? "e.g. https://hashnode.com/@your-username" :
                              link.platform === 'stackoverflow' ? "e.g. https://stackoverflow.com/users/your-id/your-username" :
                              "Enter URL"
                            }
                            type="text"
                            aria-label={`URL for link ${index + 1}`}
                            className="url-input"
                          />
                        </div>

                        <ErrorMessage
                          name={`links.${index}.url`}
                          component="div"
                          role="alert"
                        />
                      </div>
                    ))
                  )}
                  
                  <div className="button-container">
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