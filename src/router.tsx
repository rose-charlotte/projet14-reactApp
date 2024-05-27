import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";

export const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<Home />} />));
