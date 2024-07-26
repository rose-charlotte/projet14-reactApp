import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Home } from "../Pages/Home/Home";
import { InputElement } from "../components/Commons/inputElement/InputElement";
import { MemoryRouter } from "react-router-dom";

describe("Given I am on the home page", () => {
    test("show form to register an employee", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const title = screen.getByText("HRnet");
        expect(title).toBeTruthy();
    });

    test("inputElement should have a label", () => {
        render(<InputElement label="test" name="test" required />);
        const input = screen.getByRole("textbox");
        expect(input).toHaveProperty("name", "test");
    });

    test("button should be present", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const button = screen.getByRole("button");
        expect(button).toBeTruthy();
    });
});
