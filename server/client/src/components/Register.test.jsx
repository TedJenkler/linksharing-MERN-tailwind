import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Register from './Register';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import userSlice from '../features/user/userSlice';
import { registerUser } from '../features/user/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-redux', () => {
    const actualReactRedux = jest.requireActual('react-redux');
    return {
      ...actualReactRedux,
      useDispatch: jest.fn(),
    };
  });
  
  jest.mock('../features/user/userSlice', () => ({
    ...jest.requireActual('../features/user/userSlice'),
    registerUser: jest.fn().mockImplementation((payload) => ({ type: 'registerUser', payload }))
  }));

const mockReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    mock: mockReducer,
  },
});

test('See if register renders', () => {
  render(
    <Router>
      <Provider store={store}>
        <Register />
      </Provider>
    </Router>
  );

  const emailInput = screen.getByPlaceholderText('e.g. alex@email.com');
  const passwordInput = screen.getByPlaceholderText('At least 8 characters');
  const repeatPasswordInput = screen.getByPlaceholderText('Must match password');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(repeatPasswordInput).toBeInTheDocument();
});

test('Check so that user can’t submit the form with empty fields', async () => {
  render(
    <Provider store={store}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Email required.';
          }
          if (!values.password) {
            errors.password = 'Required.';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required.';
          }
          return errors;
        }}
      >
        <Form>
          <Field
            data-testid="email-input"
            name="email"
            placeholder="e.g. alex@email.com"
          />
          <ErrorMessage
            data-testid="email-error"
            name="email"
            component="div"
          />
          <Field
            data-testid="password-input"
            name="password"
            placeholder="At least 8 characters"
          />
          <ErrorMessage
            data-testid="password-error"
            name="password"
            component="div"
          />
          <Field
            data-testid="confirm-input"
            name="confirmPassword"
            placeholder="Must match password"
          />
          <ErrorMessage
            data-testid="confirm-error"
            name="confirmPassword"
            component="div"
          />
        </Form>
      </Formik>
    </Provider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const confirmPasswordInput = screen.getByTestId('confirm-input');

  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.blur(emailInput);

  fireEvent.change(passwordInput, { target: { value: '' } });
  fireEvent.blur(passwordInput);

  fireEvent.change(confirmPasswordInput, { target: { value: '' } });
  fireEvent.blur(confirmPasswordInput);

  await waitFor(() => {
    const emailError = screen.queryByTestId('email-error');
    expect(emailError).toHaveTextContent('Email required.');
  });

  await waitFor(() => {
    const passwordError = screen.queryByTestId('password-error');
    expect(passwordError).toHaveTextContent('Required.');
  });

  await waitFor(() => {
    const confirmError = screen.queryByTestId('confirm-error');
    expect(confirmError).toHaveTextContent('Required.');
  });
});

test('Invalid email entered shows error', async () => {
  render(
    <Formik
      initialValues={{ email: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email.';
        }
        return errors;
      }}
      onSubmit={() => {}}
    >
      <Form>
        <Field
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
        />
        <ErrorMessage
          data-testid="email-error"
          name="email"
          component="div"
        />
      </Form>
    </Formik>
  );

  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'ted' } });
  fireEvent.blur(emailInput);

  await waitFor(() => {
    const emailError = screen.queryByTestId('email-error');
    expect(emailError).toHaveTextContent('Invalid email.');
  });
});

test('Invalid password', async () => {
    render(
      <Formik
        initialValues={{ password: '' }}
        validate={values => {
          const errors = {};
          if (values.password.length < 8) {
            errors.password = 'Min 8 characters.';
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password = '1 uppercase letter.';
          } else if (!/\d/.test(values.password)) {
            errors.password = '1 number.';
          } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
            errors.password = '1 special character.';
          }
          return errors;
        }}
        onSubmit={() => {}}
      >
        <Form>
          <Field
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="At least 8 characters"
          />
          <ErrorMessage
            data-testid="password-error"
            name="password"
            component="div"
          />
        </Form>
      </Formik>
    );
  
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      const passwordError = screen.queryByTestId('password-error');
      expect(passwordError).toHaveTextContent('Min 8 characters.');
    });

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      const passwordError = screen.queryByTestId('password-error');
      expect(passwordError).toHaveTextContent('1 uppercase letter.');
    });
  
    fireEvent.change(passwordInput, { target: { value: 'ABCDERFGSG' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      const passwordError = screen.queryByTestId('password-error');
      expect(passwordError).toHaveTextContent('1 number.');
    });
  
    fireEvent.change(passwordInput, { target: { value: 'A1234567' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      const passwordError = screen.queryByTestId('password-error');
      expect(passwordError).toHaveTextContent('1 special character.');
    });
  });
  
  test('Dispatches registerUser action with correct payload on form submission', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  
    const store = configureStore({
      reducer: {
        user: userSlice
      }
    });
  
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
  
    fireEvent.change(screen.getByPlaceholderText('e.g. alex@email.com'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), { target: { value: 'Password@123' } });
    fireEvent.change(screen.getByPlaceholderText('Must match password'), { target: { value: 'Password@123' } });
  
    await waitFor(() => {
      const submitButton = screen.getByTestId('register');
      expect(submitButton).not.toBeDisabled();
    });
  
    fireEvent.click(screen.getByTestId('register'));
  
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
      console.log('Dispatched actions:', dispatch.mock.calls);
      const expectedAction = registerUser({
        firstName: "",
        lastName: "",
        email: 'john.doe@example.com',
        password: 'Password@123'
      });
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(expectedAction));
    });
  });