import { Link } from "react-router-dom";
import { InputElement } from "../../components/Commons/InputElement/InputElement";

export function Home() {
    return (
        <>
            <div>
                <h1>HRnet</h1>
                <Link to="/">View current Employees</Link>
                <h2>Create Employee</h2>
            </div>
            <div>
                <InputElement label="First Name" name="firstName" />
                <InputElement label="Last Name" name="lastName" />
            </div>
        </>
    );
}
