import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import { AuthProvider } from './context/auth.jsx'
import UserTable from './pages/UserTable.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
 
 
 
  {
    path: "/login",
    element: <Login />,

  },
  {
    path: "/signup",
    element: <Signup />,

  },
 
  // {
  //   path: "/logout",
  //   element: <Logout />

  // },
 
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />

  // },
  {
    path: "/usertable",
    element: <UserTable />

  },
  {
    path: "/reset",
    element: <ResetPassword />

  },
  {
    path: "/forget",
    element: <ForgotPassword />

  },
  {
    path: "/reset/:token",
    element: <ResetPassword />

  },
 
]);
createRoot(document.getElementById('root')).render(

    <StrictMode>
     <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
    

 
);