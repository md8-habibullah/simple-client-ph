import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {RouterProvider } from "react-router-dom";
import router from "./Routes.jsx";

const root = document.getElementById("root");

createRoot(root).render(<RouterProvider router={router} />);
