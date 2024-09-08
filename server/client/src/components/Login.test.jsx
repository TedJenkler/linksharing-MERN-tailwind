import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import userSlice from '../features/user/userSlice';
import { loginUser } from '../features/user/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
  loginUser: jest.fn().mockImplementation((payload) => ({ type: 'loginUser', payload }))
}));

const mockReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    mock: mockReducer,
  },
});

test('See if login renders', () => {
  render(
    <Router>
      <Provider store={store}>
        <Login />
      </Provider>
    </Router>
  );

  const emailInput = screen.getByPlaceholderText('e.g. alex@email.com');
  const passwordInput = screen.getByPlaceholderText('Enter your password');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('Check so that user can’t submit the form with empty fields', async () => {
  render(
    <Provider store={store}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Email required.';
          }
          if (!values.password) {
            errors.password = 'Required.';
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
            placeholder="Enter your password"
          />
          <ErrorMessage
            data-testid="password-error"
            name="password"
            component="div"
          />
        </Form>
      </Formik>
    </Provider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.blur(emailInput);

  fireEvent.change(passwordInput, { target: { value: '' } });
  fireEvent.blur(passwordInput);

  await waitFor(() => {
    const emailError = screen.queryByTestId('email-error');
    expect(emailError).toHaveTextContent('Email required.');
  });

  await waitFor(() => {
    const passwordError = screen.queryByTestId('password-error');
    expect(passwordError).toHaveTextContent('Required.');
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
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.blur(emailInput);

  await waitFor(() => {
    const emailError = screen.queryByTestId('email-error');
    expect(emailError).toHaveTextContent('Invalid email.');
  });
});

test('Dispatches loginUser action with correct payload on form submission', async () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);

  const store = configureStore({
    reducer: {
      user: userSlice
    }
  });

  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('e.g. alex@email.com'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Password@123' } });

  await waitFor(() => {
    const submitButton = screen.getByTestId('login');
    expect(submitButton).not.toBeDisabled();
  });

  fireEvent.click(screen.getByTestId('login'));

  await waitFor(() => {
    expect(dispatch).toHaveBeenCalled();
    const expectedAction = loginUser({
      email: 'john.doe@example.com',
      password: 'Password@123'
    });
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(expectedAction));
  });
});