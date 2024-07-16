import { test, expect } from "@playwright/test";
import { Employee } from "../src/data/models/Employee";

const employeesListUrl = "http://localhost:5173/employee-list";

const employees: Employee[] = [
    {
        city: "Grilly",
        dateOfBirth: new Date("2008-08-22"),
        department: "Sales",
        firstName: "Eve",
        lastName: "Rose",
        startDate: new Date("2024-07-16"),
        state: "Texas",
        street: "83 chemin Jacques Belay",
        zipCode: "01220",
    },
    {
        city: "Grilly",
        dateOfBirth: new Date("2014-01-03"),
        department: "Sales",
        firstName: "Lola",
        lastName: "Rose",
        startDate: new Date("2024-07-16"),
        state: "Alabama",
        street: "83 chemin Jacques Belay",
        zipCode: "01220",
    },
    {
        city: "Grilly",
        dateOfBirth: new Date("1981-09-07"),
        department: "Engineering",
        firstName: "Charlotte",
        lastName: "Rose",
        startDate: new Date("2000-07-16"),
        state: "Alabama",
        street: "Rue ici",
        zipCode: "01220",
    },
    {
        city: "Grilly",
        dateOfBirth: new Date("1982-11-16"),
        department: "Engineering",
        firstName: "Antoine",
        lastName: "Rose",
        startDate: new Date("2000-09-16"),
        state: "Alabama",
        street: "Rue labas",
        zipCode: "01220",
    },
    {
        city: "Grilly",
        dateOfBirth: new Date("2020-06-15"),
        department: "Engineering",
        firstName: "Tigresse",
        lastName: "Rose",
        startDate: new Date("2021-07-16"),
        state: "Illinois",
        street: "Rue du chat",
        zipCode: "01220",
    },
    {
        city: "Grilly",
        dateOfBirth: new Date("1960-06-15"),
        department: "Engineering",
        firstName: "Minette",
        lastName: "Rose",
        startDate: new Date("1990-07-16"),
        state: "Illinois",
        street: "Rue du chat",
        zipCode: "01220",
    },
];

test("has title", async ({ page }) => {
    await page.goto(employeesListUrl);

    await expect(page.getByRole("heading", { name: "HRnet" })).toBeVisible();
});

test("has a table", async ({ page }) => {
    await page.goto(employeesListUrl);

    await expect(page.getByRole("cell", { name: "First Name" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Last Name" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Start Date" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Department" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Date of Birth" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Street" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "City" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "State" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Zip Code" })).toBeVisible();
});

test("has a search input", async ({ page }) => {
    await page.goto(employeesListUrl);

    await expect(page.getByLabel("search")).toBeVisible();
});

test("search input", async ({ page }) => {
    await page.goto(employeesListUrl);

    await page.evaluate(employeeList => {
        window.localStorage.setItem("employees", JSON.stringify(employeeList));
    }, employees);

    await page.reload();

    await expect(page.getByTestId("employees-table")).toBeVisible();
    await expect(page.getByTestId("tr-0")).toBeVisible();
    await expect(page.getByTestId("tr-1")).toBeVisible();

    await expect(page.getByTestId("tr-0_td-firstName")).toHaveText("Eve");
    await expect(page.getByTestId("tr-1_td-firstName")).toHaveText("Lola");

    await page.getByLabel("search").fill("Eve");
    await expect(page.getByTestId("tr-0_td-firstName")).toHaveText("Eve");
    await expect(page.getByTestId("tr-1")).not.toBeVisible();
});

test("employees per page select", async ({ page }) => {
    await page.goto(employeesListUrl);

    await page.evaluate(employeeList => {
        window.localStorage.setItem("employees", JSON.stringify(employeeList));
    }, employees);
    await page.reload();

    await expect(page.getByLabel("Employees per page")).toBeVisible();
    await page.getByLabel("Employees per page").selectOption("5");
    await expect(page.getByTestId("tr-4")).toBeVisible();
    await expect(page.getByTestId("tr-5")).not.toBeVisible();
});
