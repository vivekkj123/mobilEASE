import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import CitizenLogin from './pages/CitizenLogin';
import OfficialLogin from './pages/OfficialLogin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/citizen-login",
    element: <CitizenLogin/>,
  },
  {
    path: "/official-login",
    element: <OfficialLogin/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
