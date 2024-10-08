import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../assets/logo.png";
import iconmail from '../assets/iconmail.png';
import iconpassword from '../assets/iconpassword.png';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email.')
    .required('Email required.'),
  
  password: Yup.string()
    .required('Required.')
    .min(8, 'Min 8 characters.')
    .matches(/(?=.*[A-Z])/, '1 uppercase letter.')
    .matches(/(?=.*\d)/, '1 number.')
    .matches(/(?=.*[@#])/, '1 special character.'),
  
  confirmPassword: Yup.string()
    .required('Required.')
    .oneOf([Yup.ref('password')], 'Passwords must match.'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <img className='logo' src={logo} alt='Company Logo' />
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError, resetForm }) => {
          const resultAction = await dispatch(registerUser({
            firstName: "",
            lastName: "",
            email: values.email,
            password: values.password,
          }));

          if (registerUser.rejected.match(resultAction)) {
            if (resultAction.payload === 'Email already taken') {
              setFieldError('email', 'Email already taken');
            }
          } else {
            resetForm();
            navigate('/login');
          }
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className='register'>
            <div className='heading'>
              <h1>Create account</h1>
              <p>Let’s get you started sharing your links!</p>
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
              <label htmlFor="password">Create password</label>
              <Field
                data-testid="password-input"
                type="password"
                name="password"
                id="password"
                aria-required="true"
                aria-describedby="password-error"
                placeholder={touched.password && errors.password ? '' : 'At least 8 characters'}
                className={touched.password && errors.password ? 'input-error' : ''}
                autoComplete="new-password"
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

            <div className='inputs'>
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field
                data-testid="confirm-input"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                aria-required="true"
                aria-describedby="confirmPassword-error"
                placeholder={touched.confirmPassword && errors.confirmPassword ? '' : 'Must match password'}
                className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
                autoComplete="new-password"
              />
              <ErrorMessage
                data-testid="confirm-error"
                className='error-message'
                name="confirmPassword"
                component="div"
                id="confirmPassword-error"
                role="alert"
                aria-live="assertive"
              />
              <img src={iconpassword} alt='password icon' />
            </div>

            <button data-testid="register" type="submit" disabled={isSubmitting}>
              Create new account
            </button>

            <div className='to-login'>
              <p>Already have an account?</p>
              <a href="/login">Login</a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;