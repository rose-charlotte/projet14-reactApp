import style from "./EmployeeListPage.module.scss";

export function EmployeeListPage() {
    return (
        <div className={style.container}>
            <h1>Current Employee</h1>
            <table>
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
            </table>
        </div>
    );
}
