import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../assets/logo.png";
import iconmail from '../assets/iconmail.png';
import iconpassword from '../assets/iconpassword.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required.'),
  
  password: Yup.string()
    .required('Required.')
});

const Login = () => {
  const dispatch = useDispatch();

  return (
    <>
      <img className='logo' src={logo} alt='Company Logo' />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const resultAction = await dispatch(loginUser({ email: values.email, password: values.password }));

          if (loginUser.rejected.match(resultAction)) {
            if (resultAction.payload === 'Account not found') {
              setFieldError('email', 'Account not found');
            } else if (resultAction.payload === 'Wrong Password') {
              setFieldError('password', 'Wrong Password');
            }
          } else {
            resetForm();
          }
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className='login'>
            <div className='heading'>
              <h1>Login to your account</h1>
              <p>Welcome back! Please enter your details.</p>
            </div>
            <div className='inputs'>
              <label htmlFor="email">Email address</label>
              <Field
                data-testid="email-input"
                type="email"
                name="email"
                id="email"
                aria-required="true"
                aria-describedby="email-error"
                placeholder={touched.email && errors.email ? '' : 'e.g. alex@email.com'}
                className={touched.email && errors.email ? 'input-error' : ''}
                autoComplete="email"
              />
              <ErrorMessage
                data-testid="email-error"
                className='error-message'
                name="email"
                component="div"
                id="email-error"
                role="alert"
                aria-live="assertive"
              />
              <img src={iconmail} alt='mail icon' />
            </div>
            <div className='inputs'>
              <label htmlFor="password">Password</label>
              <Field
                data-testid="password-input"
                type="password"
                name="password"
                id="password"
                aria-required="true"
                aria-describedby="password-error"
                placeholder={touched.password && errors.password ? '' : 'Enter your password'}
                className={touched.password && errors.password ? 'input-error' : ''}
                autoComplete="current-password"
              />
              <ErrorMessage
                data-testid="password-error"
                className='error-message'
                name="password"
                component="div"
                id="password-error"
                role="alert"
                aria-live="assertive"
              />
              <img src={iconpassword} alt='password icon' />
            </div>
            <button data-testid="login" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className='to-register'>
              <p>Don’t have an account?</p>
              <a href="/register">Create account</a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;