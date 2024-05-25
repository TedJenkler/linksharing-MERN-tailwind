import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import App from './components/App.jsx';
import Preview from './components/Preview.jsx';
import ViewUser from './components/ViewUser.jsx'

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
    element: <App />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '/view/:email',
    element: <ViewUser />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);