import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'

   const router =  createBrowserRouter([
        {
          path: "/",
          element: <App></App>,
        },
      ]);

export default router;