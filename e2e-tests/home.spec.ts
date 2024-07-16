import { test, expect } from "@playwright/test";

const homeUrl = "http://localhost:5173/";

test("has title", async ({ page }) => {
    await page.goto(homeUrl);

    await expect(page.getByRole("heading", { name: "HRnet" })).toBeVisible();
});

test("has form", async ({ page }) => {
    await page.goto(homeUrl);

    await expect(page.getByRole("heading", { name: "Personal informations:" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "First Name" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Last Name" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Date of Birth" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Address:" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Street" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "City" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "State" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Zip Code" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Other informations:" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Department" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Start Date" })).toBeVisible();
});

test("create user writes to local storage", async ({ page }) => {
    await page.goto(homeUrl);

    await page.getByLabel("First Name").fill("Jambon");
    await page.getByLabel("Last Name").fill("Beurre");
    await page.getByLabel("Date of Birth").fill("1982-11-16");

    await page.getByLabel("Street").fill("83 chemin Jacques Belay");
    await page.getByLabel("City").fill("Grilly");
    await page.getByLabel("State").selectOption({ label: "Texas" });
    await page.getByLabel("Zip Code").fill("01220");

    await page.getByLabel("Department").selectOption("Engineering");
    await page.getByLabel("Start Date").fill("2024-01-01");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("button", { name: "close" })).toBeVisible();

    const storageValue = await page.evaluate(() => localStorage.getItem("employees"));

    expect(storageValue).toBe(
        '[{"firstName":"Jambon","lastName":"Beurre","dateOfBirth":"1982-11-16T00:00:00.000Z","startDate":"2024-01-01T00:00:00.000Z","street":"83 chemin Jacques Belay","city":"Grilly","state":"Texas","zipCode":1220,"department":"Engineering"}]'
    );
});

test("create user shows in the employee list", async ({ page }) => {
    await page.getByRole("button", { name: "close" }).click();

    await page.getByRole("link", { name: "View current Employees" }).click();

    await page.getByRole("heading", { name: "Current Employees" });
});
