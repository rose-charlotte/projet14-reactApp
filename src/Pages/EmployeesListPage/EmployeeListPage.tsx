import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";
import { Employee } from "../../data/models/Employee.ts";
import { getEmployees } from "../../data/employeeRepository.ts";
import { useEffect, useState } from "react";

export function EmployeeListPage() {
    const tableElements = [
        "First Name",
        "Last Name",
        "Start Date",
        "Department",
        "Date of Birth",
        "Street",
        "City",
        "State",
        "Zip Code",
    ];
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
                <thead className={style.tableHead}>
                    {tableElements.map((ele, index) => (
                        <tr key={index}>
                            <th>
                                {ele} <button onClick={() => console.log("ca marche")}>v</button>
                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr className={style.employeeList} key={index}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.startDate?.toLocaleString()}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dateOfBirth?.toLocaleString()}</td>
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
