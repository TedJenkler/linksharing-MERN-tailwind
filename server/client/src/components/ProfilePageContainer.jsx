import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImgUploader from './ImgUploader';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Can’t be empty'),
  lastName: Yup.string().required('Can’t be empty'),
  email: Yup.string().email('Not a valid email'),
});

function ProfilePageContainer() {
  const dispatch = useDispatch();

  return (
    <main className='profilepage'>
      <header>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </header>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
 
          const { ...userData } = values;
          
          dispatch(updateUser({ 
            ...userData, 
            currentEmail: "tedjenkler@gmail.com"
          }));
        }}
      >
        {({ touched, errors }) => (
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
                    placeholder="e.g. John"
                    className={touched.firstName && errors.firstName ? 'input-error' : ''}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    role="alert"
                    id="firstNameError"
                    className="error"
                  />
                </div>

                <div className='inputs'>
                  <label htmlFor="lastName">Last Name*</label>
                  <Field
                    id="lastName"
                    name="lastName"
                    aria-required="true"
                    aria-describedby="lastNameError"
                    placeholder="e.g. Appleseed"
                    className={touched.lastName && errors.lastName ? 'input-error' : ''}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    role="alert"
                    id="lastNameError"
                    className="error"
                  />
                </div>

                <div className='inputs'>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    aria-describedby="emailError"
                    placeholder="e.g. email@example.com"
                    className={touched.email && errors.email ? 'input-error' : ''}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    role="alert"
                    id="emailError"
                    className="error"
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