import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
//The following import get marked as unused despite beeing important. Ignore the warning.
import { i18n } from './services/i18n';
import './custom.scss';
import './index.css';
import Login from './components/Login/Login';
import Error from './components/Error/Error';
import Connection from './components/Connection/Connection';
import Main from './components/Main/Main';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Main />,
  },
  {
    path: "/connection/:connectionId",
    element: <Connection />,
  },
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
