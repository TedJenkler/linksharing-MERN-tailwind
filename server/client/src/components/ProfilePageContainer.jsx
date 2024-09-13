import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImgUploader from './ImgUploader';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Can’t be empty'),
  lastName: Yup.string().required('Can’t be empty'),
  email: Yup.string().email('Not a valid email').required('Can’t be empty'),
  images: Yup.array()
    .of(Yup.mixed().required('Required'))
    .min(1, 'At least one image is required')
});

function ProfilePageContainer() {
  return (
    <main className='profilepage'>
      <header>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </header>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', images: [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <ImgUploader />

            <section aria-labelledby="personalDetailsSection">
              <div className='inputs-container'>
                <div className='inputs'>
                  <label htmlFor="firstName">First Name*</label>
                  <Field
                    id="firstName"
                    name="firstName"
                    aria-required="true"
                    aria-describedby="firstNameError"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    role="alert"
                    id="firstNameError"
                  />
                </div>

                <div className='inputs'>
                  <label htmlFor="lastName">Last Name*</label>
                  <Field
                    id="lastName"
                    name="lastName"
                    aria-required="true"
                    aria-describedby="lastNameError"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    role="alert"
                    id="lastNameError"
                  />
                </div>

                <div className='inputs'>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    aria-describedby="emailError"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    role="alert"
                    id="emailError"
                  />
                </div>
              </div>

              <div className='button-container'>
                <button type="submit">Save</button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default ProfilePageContainer;