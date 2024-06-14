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
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        async function fetchEmployees() {
            setEmployees(await getEmployees());
        }

        fetchEmployees();
    }, []);

    if (!employees) {
        return <span>Loading...</span>;
    }

    const handleSort = (index: number, ele: string) => {
        console.log(index, ele);
        const type = ele.split(" ").join("");

        const employeesCopy = [...employees];

        switch (type) {
            case "FirstName":
                if (!sorted) {
                    console.log("pas sorted");

                    setEmployees(
                        employeesCopy.sort((e1, e2) =>
                            e1.firstName < e2.firstName ? -1 : e1.firstName > e2.firstName ? 1 : 0
                        )
                    );
                    setSorted(true);
                } else {
                    console.log("je suis sorted");
                    console.log(employees);

                    setEmployees(
                        employeesCopy.sort((e1, e2) =>
                            e1.firstName < e2.firstName ? 1 : e1.firstName > e2.firstName ? -1 : 0
                        )
                    );
                    setSorted(false);
                }

                break;

            case "LastName":
                if (!sorted) {
                    console.log("pas sorted");

                    setEmployees(
                        employeesCopy.sort((e1, e2) =>
                            e1.lastName < e2.lastName ? -1 : e1.lastName > e2.lastName ? 1 : 0
                        )
                    );
                    setSorted(true);
                } else {
                    console.log("je suis sorted");
                    console.log(employees);

                    setEmployees(
                        employeesCopy.sort((e1, e2) =>
                            e1.lastName < e2.lastName ? 1 : e1.lastName > e2.lastName ? -1 : 0
                        )
                    );
                    setSorted(false);
                }
                break;
            default:
                console.log("ca marche pas");
        }
    };

    //console.log(employees);

    return (
        <div className={style.container}>
            <h1>Current Employee</h1>
            <table>
                <thead className={style.tableHead}>
                    {tableElements.map((ele, index) => (
                        <tr key={index}>
                            <th>
                                {ele} <button onClick={() => handleSort(index, ele)}>v</button>
                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr className={style.employeeList} key={index}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.startDate?.toLocaleString().slice(0, 10)}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dateOfBirth?.toLocaleString().slice(0, 10)}</td>
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
