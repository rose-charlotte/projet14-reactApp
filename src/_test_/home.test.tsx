import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// import { Home } from "../Pages/Home/Home";
import { InputElement } from "../components/Commons/inputElement/InputElement";

// describe("Given I am on the home page", () => {
//     test("show form to register an employee", () => {
//         render(<Home />);
//         const title = screen.getByText("HRnet");
//         expect(title).toBeTruthy();
//     });
// });

test("inputElement should have a label", () => {
    render(<InputElement label="test" name="test" required />);
    const input = screen.getByRole("input");
    expect(input).toHaveProperty("name", "test");
});
