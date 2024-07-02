import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";

import { TableContainer } from "../../components/Table/TableContainer/TableContainer";
import { SearchElement } from "../../components/SearchElement/SearchElement";
import { SelectElement } from "../../components/Commons/SelectElement/SelectElement";

export function EmployeeListPage() {
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
                <TableContainer />
            </div>

            <Link to="/">Home</Link>
        </div>
    );
}
