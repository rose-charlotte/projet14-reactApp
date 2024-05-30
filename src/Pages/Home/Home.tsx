import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <h1>HRnet</h1>
            <Link to="/">View current Employees</Link>
            <h2>Create Employee</h2>
        </div>
    );
}
