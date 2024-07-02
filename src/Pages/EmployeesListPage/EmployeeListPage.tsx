import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";

import { TableContainer } from "../../components/Table/TableContainer/TableContainer";
import { SearchElement } from "../../components/SearchElement/SearchElement";
import { SelectElement } from "../../components/Commons/SelectElement/SelectElement";
import { useEffect, useState } from "react";
import { Employee } from "../../data/models/Employee";
import { getEmployees } from "../../data/employeeRepository";

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
            <h1>Current Employees</h1>
            <div className={style.elements}>
                <nav className={style.nav}>
                    <SelectElement
                        label="number of entries"
                        name="number of employees"
                        arrayOfElement={["5", "10", "20", "50", "100"]}
                    />
                    <SearchElement />
                </nav>
                <TableContainer employees={employees} />
                <div>Showing {employees.length} entries</div>
            </div>

            <Link to="/">Home</Link>
        </div>
    );
}
