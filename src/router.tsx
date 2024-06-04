import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { EmployeeListPage } from "./Pages/EmployeesListPage/EmployeeListPage";
import { Page404 } from "./Pages/Page404/Page404";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Page404 />}>
            <Route index element={<Home />} />
            <Route path="/employee-list" element={<EmployeeListPage />} />
        </Route>
    )
);
