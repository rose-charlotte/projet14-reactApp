import { Employee } from "./models/Employee";

const LOCAL_STORAGE_EMPLOYEE_KEY = "employees";

export function getEmployees(): Promise<Employee[]> {
    const employeeString = window.localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);

    if (!employeeString) {
        return Promise.resolve([]);
    }

    return Promise.resolve(JSON.parse(employeeString) as Employee[]);
}
