import { Employee } from "./models/Employee";

const LOCAL_STORAGE_EMPLOYEE_KEY = "employees";

export function getPagedEmployees(
    skip: number,
    take: number,
    sortOptions?: {
        sortedBy: keyof Employee;
        ascending: boolean;
    }
): Promise<{
    pagedEmployees: Employee[];
    totalEmployees: number;
}> {
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

    const pagedEmployees: Employee[] = allEmployees.slice(skip, skip + take);
    const totalEmployees = allEmployees.length;

    return Promise.resolve({
        pagedEmployees,
        totalEmployees,
    });
}

export function getFoundEmployees(searchInput: string): Promise<{ foundEmployees: Employee[] }> {
    const allEmployees = getAllEmployees();

    const regex = getGlobalSearchRegex(searchInput);

    const foundEmployees = allEmployees.filter(employee => {
        return (
            regex.test(removeAccents(employee.firstName)) ||
            regex.test(removeAccents(employee.lastName)) ||
            regex.test(removeAccents(employee.department)) ||
            regex.test(removeAccents(employee.street)) ||
            regex.test(removeAccents(employee.city)) ||
            regex.test(removeAccents(employee.state)) ||
            regex.test(removeAccents(employee.dateOfBirth.toLocaleDateString())) ||
            regex.test(removeAccents(employee.startDate.toLocaleDateString())) ||
            regex.test(removeAccents(employee.zipCode))
        );
    });

    return Promise.resolve({ foundEmployees });
}

export async function createEmployee(data: FormData): Promise<void> {
    //Recupération des données du FormData
    const firstName = data.get("firstName")?.toString() ?? "";
    const lastName = data.get("lastName")?.toString() ?? "";
    const dateOfBirthString = data.get("dateofBirth")?.toString() ?? "";
    const startDateString = data.get("startDate")?.toString() ?? "";
    const street = data.get("street")?.toString() ?? "";
    const city = data.get("city")?.toString() ?? "";
    const state = data.get("state")?.toString() ?? "";
    const zipCode = data.get("zipCode")?.toString() ?? "";
    const department = data.get("department")?.toString() ?? "";

    //Transformation des données qui ne sont pas des strings
    const dateOfBirth = new Date(dateOfBirthString!);
    const startDate = new Date(startDateString!);

    const employee = { firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department };

    //Traitement des données - ajout dans le [] employeesList puis stockage des donnees dans le localStorage
    const employeesList = await getAllEmployees();
    employeesList.push(employee);

    //Put all elements to strings
    return Promise.resolve(window.localStorage.setItem("employees", JSON.stringify(employeesList)));
}

function getAllEmployees(): Employee[] {
    const employeeString = window.localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);

    if (!employeeString) {
        return [];
    }

    // give back date property to date element instead of string due to JSON.stingify
    const stringifiedEmployees: StringifyDates<Employee>[] = JSON.parse(employeeString);

    return stringifiedEmployees.map(emp => ({
        ...emp,
        dateOfBirth: new Date(emp.dateOfBirth),
        startDate: new Date(emp.startDate),
    }));
}

const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function getGlobalSearchRegex(item: string): RegExp {
    //On cherche les strings sans accent ni majuscule
    const searchStringWithoutAccents = removeAccents(item);

    // Transforme en tableau de mots
    const searchWords = searchStringWithoutAccents.split(" ");

    // Transforme le tableau de mot en tableau de regex
    const searchWordsLookaheadRegex = searchWords.map(word => `(?=.*\\b[^\\s]*${word}[^\\s]*\\b)`);

    // Crée la regex finale
    const searchRegexExpression = `^${searchWordsLookaheadRegex.join("")}.*$`;

    const regex = new RegExp(searchRegexExpression, "i");

    return regex;
}

// Create a specific type to manage Date type
type StringifyDates<T> = {
    [Property in keyof T]: T[Property] extends Date ? string : T[Property];
};
