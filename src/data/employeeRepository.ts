import { Employee } from "./models/Employee";

const LOCAL_STORAGE_EMPLOYEE_KEY = "employees";

export function getEmployees(
    skip: number,
    take: number,
    sortOptions?: {
        sortedBy: keyof Employee;
        ascending: boolean;
    }
): Promise<Employee[]> {
    const allEmployees = getAllEmployees();

    if (sortOptions) {
        allEmployees.sort((left, right) =>
            left[sortOptions.sortedBy] > right[sortOptions.sortedBy]
                ? sortOptions.ascending
                    ? 1
                    : -1
                : left[sortOptions.sortedBy] < right[sortOptions.sortedBy]
                ? sortOptions.ascending
                    ? -1
                    : 1
                : 0
        );
    }

    return Promise.resolve(allEmployees.slice(skip, skip + take));
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

    const employee = { firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department };

    //Traitement des données - ajout dans le [] employeesList puis stockage des donnees dans le localStorage
    const employeesList = await getAllEmployees();
    employeesList.push(employee);

    return Promise.resolve(window.localStorage.setItem("employees", JSON.stringify(employeesList)));
}

function getAllEmployees(): Employee[] {
    const employeeString = window.localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);

    if (!employeeString) {
        return [];
    }

    return JSON.parse(employeeString) as Employee[];
}
