import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";
import { Employee } from "../../data/models/Employee.ts";
import { getEmployees } from "../../data/employeeRepository.ts";
import { useEffect, useState } from "react";

export function EmployeeListPage() {
    const [employees, setEmployees] = useState<Employee[]>();

    useEffect(() => {
        async function fetchEmployees() {
            setEmployees(await getEmployees());
        }

        fetchEmployees();
    }, []);

    if (!employees) {
        return <span>Loading...</span>;
    }

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
                    {employees.map(employee => (
                        <tr>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.startDate?.toLocaleString()}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dateofBirth?.toLocaleString()}</td>
                            <td>{employee.street}</td>
                            <td>{employee.city}</td>
                            <td>{employee.state}</td>
                            <td>{employee.zipCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Home</Link>
        </div>
    );
}
