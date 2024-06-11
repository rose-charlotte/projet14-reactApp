import { Employee } from "./models/Employee";

const LOCAL_STORAGE_EMPLOYEE_KEY = "employees";

export function getEmployees(): Promise<Employee[]> {
    const employeeString = window.localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);

    if (!employeeString) {
        return Promise.resolve([]);
    }

    return Promise.resolve(JSON.parse(employeeString) as Employee[]);
}

export async function createEmployee(data: FormData): Promise<void> {
    //Recupération des données du FormData
    const firstName = data.get("firstName")?.toString() ?? "";
    const lastName = data.get("lastName")?.toString() ?? "";
    const dateOfBirthString = data.get("dateofBirth")?.toString();
    const startDateString = data.get("startDate")?.toString();
    const street = data.get("street")?.toString() ?? "";
    const city = data.get("city")?.toString() ?? "";
    const state = data.get("state")?.toString() ?? "";
    const zipCodeString = data.get("zipCode")?.toString() ?? "";
    const department = data.get("department")?.toString() ?? "";

    //Transformation des données qui ne sont pas des strings
    const dateOfBirth = new Date(dateOfBirthString!);
    const startDate = new Date(startDateString!);
    const zipCode = parseInt(zipCodeString!);

    console.log(dateOfBirth);

    const employee = { firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department };

    //Traitement des données - ajout dans le [] employeesList puis stockage des donnees dans le localStorage
    const employeesList = await getEmployees();
    employeesList.push(employee);

    return Promise.resolve(window.localStorage.setItem("employees", JSON.stringify(employeesList)));
}
