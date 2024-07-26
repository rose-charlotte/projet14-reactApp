import { describe, expect, test, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { TableContainer } from "../components/Table/TableContainer";
import { TableColumn } from "../components/Table/TableColumn";
import { TableSortOptions } from "../components/Table/TableSortOptions";
//import { Home } from "../Pages/Home/Home";

describe("thead test suite", () => {
    interface FakeEntity {
        firstName: string;
        lastName: string;
        age: number;
    }

    const defaultColumns: TableColumn<FakeEntity>[] = [
        {
            columnName: "First name",
            propertyName: "firstName",
        },
        {
            columnName: "Last name",
            propertyName: "lastName",
        },
        {
            columnName: "Age",
            propertyName: "age",
        },
    ];

    test("should display column names", () => {
        const renderResult = render(
            <TableContainer columns={defaultColumns} items={[]} onSortChange={() => {}} testid="table" />
        );

        expect(renderResult.getByTestId("table")).toBeInTheDocument();

        defaultColumns.forEach(column => {
            const th = renderResult.getByTestId(`th-${column.propertyName}`);

            expect(th).toHaveTextContent(column.columnName);
        });
    });

    test("should change sort options", () => {
        const onSortChange = vi.fn();

        // Should raise the ascending onSortChangeEvent
        const renderResult = render(
            <TableContainer columns={defaultColumns} items={[]} onSortChange={onSortChange} testid="table" />
        );

        const firstNameColumnHeader = renderResult.getByTestId(`th-firstName`);

        fireEvent.click(firstNameColumnHeader);

        const firstRenderOptions: TableSortOptions<FakeEntity> = {
            ascending: true,
            sortedBy: "firstName",
        };

        expect(onSortChange).toHaveBeenCalledWith(firstRenderOptions);

        // Should raise the descending onSortChangeEvent
        renderResult.rerender(
            <TableContainer
                columns={defaultColumns}
                items={[]}
                onSortChange={onSortChange}
                testid="table"
                sortOptions={firstRenderOptions}
            />
        );

        onSortChange.mockReset();

        fireEvent.click(firstNameColumnHeader);

        const secondRenderOptions: TableSortOptions<FakeEntity> = {
            ascending: false,
            sortedBy: "firstName",
        };

        expect(onSortChange).toHaveBeenCalledWith(secondRenderOptions);

        // Should raise the onSortChange event with undefined
        renderResult.rerender(
            <TableContainer
                columns={defaultColumns}
                items={[]}
                onSortChange={onSortChange}
                testid="table"
                sortOptions={secondRenderOptions}
            />
        );

        onSortChange.mockReset();

        fireEvent.click(firstNameColumnHeader);

        expect(onSortChange).toHaveBeenCalledWith(undefined);
    });

    test("should change to undifined the sortOption of a column by clicking on another one", () => {
        const onSortChange = vi.fn();

        // Should raise the ascending onSortChangeEvent
        const renderResult = render(
            <TableContainer columns={defaultColumns} items={[]} onSortChange={onSortChange} testid="table" />
        );

        const firstNameColumnHeader = renderResult.getByTestId(`th-firstName`);

        fireEvent.click(firstNameColumnHeader);

        const firstRenderOptions: TableSortOptions<FakeEntity> = {
            ascending: true,
            sortedBy: "firstName",
        };

        expect(onSortChange).toHaveBeenCalledWith(firstRenderOptions);

        renderResult.rerender(
            <TableContainer
                columns={defaultColumns}
                items={[]}
                onSortChange={onSortChange}
                testid="table"
                sortOptions={firstRenderOptions}
            />
        );

        onSortChange.mockReset();
        const lastNameColumnHeader = renderResult.getByTestId(`th-lastName`);
        fireEvent.click(lastNameColumnHeader);

        const renderOptions: TableSortOptions<FakeEntity> = {
            ascending: true,
            sortedBy: "lastName",
        };

        expect(onSortChange).toHaveBeenCalledWith(renderOptions);
    });
});
