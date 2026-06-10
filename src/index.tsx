import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './main/Main';
import List from './list/List';
import Building from './building/Building';
import Chart from './chart/Chart';
import Testing from './testing/Testing';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/list',
    element: <List />,
  },
  {
    path: '/building/:id',
    element: <Building />,
  },
  {
    path: '/chart',
    element: <Chart />,
  },
  {
    path: '/testing',
    element: <Testing />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
