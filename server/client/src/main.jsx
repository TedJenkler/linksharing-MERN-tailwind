import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/Register.jsx';
import App from './components/App.jsx';
import Preview from './components/Preview.jsx';
import ViewUser from './components/ViewUser.jsx';
import './assets/scss/main.scss';

// Check if the user has a token
const isAuthenticated = () => {
  // Implement your authentication logic here
  // For example, check if the user has a token in local storage
  return localStorage.getItem('token') !== null;
};

// Higher-order component for authenticated routes
const AuthRoute = ({ element, path }) => {
  if (!isAuthenticated() && path !== '/login' && path !== '/register') {
    // If the user is not authenticated and the route is not for login or register, redirect to login
    return <Navigate to="/login" />;
  }
  // For authenticated users or non-authenticated users accessing login/register routes, just render the component
  return element;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/app',
    element: <AuthRoute element={<App />} path="/app" />,
  },
  {
    path: '/preview',
    element: <AuthRoute element={<Preview />} path="/preview" />,
  },
  {
    path: '/view/:email',
    element: <ViewUser />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);