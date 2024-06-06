import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";

export function EmployeeListPage() {
    const employees = JSON.parse(localStorage.getItem("employee") || "");
    console.log("employee", employees);
    return (
        <div className={style.container}>
            <h1>Current Employee</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Strart Date</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <Link to="/">Home</Link>
        </div>
    );
}
