import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";

import { SelectElement } from "../../components/Commons/selectElement/SelectElement";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { Employee } from "../../data/models/Employee";
import { getFoundEmployees, getPagedEmployees } from "../../data/employeeRepository";
import { TableColumn } from "../../components/Table/TableColumn";
import { TableSortOptions } from "../../components/Table/TableSortOptions";
import { InputElement } from "../../components/Commons/inputElement/InputElement";
import { TableContainer } from "../../components/Table/TableContainer";

export function EmployeeListPage() {
    const numberOfEmployeesPerPage = [5, 10, 15, 20, 50, 100];

    const inputRef = useRef<HTMLFormElement>();

    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = useState(1);
    const [sortOptions, setSortOptions] = useState<TableSortOptions<Employee> | undefined>();
    const [employees, setEmployees] = useState<Employee[]>();
    const [employeeCount, setEmployeeCount] = useState(0);

    const [searchInput, setSearchInput] = useState("");
    const [foundElement, setFoundElement] = useState<Employee[]>();

    const disabledPrevBtn = page === 1;
    const totalPages = Math.ceil(employeeCount / pageSize);
    const disabledNextBtn = totalPages <= page;

    useEffect(() => {
        async function fetchEmployees() {
            const { pagedEmployees, totalEmployees } = await getPagedEmployees(
                (page - 1) * pageSize,
                pageSize,
                sortOptions
                    ? {
                          ascending: sortOptions.ascending,
                          sortedBy: sortOptions.sortedBy,
                      }
                    : undefined
            );

            if (searchInput.length >= 1) {
                const { foundEmployees } = await getFoundEmployees(searchInput);
                setFoundElement(foundEmployees);
            }
            setEmployees(pagedEmployees);
            setEmployeeCount(totalEmployees);
        }

        fetchEmployees();
    }, [sortOptions, page, pageSize, searchInput]);

    if (!employees) {
        return <span>Loading...</span>;
    }

    // Set up the button to change pages
    const handlePreviousPage = () => {
        setPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    // Set up the pageSize choosen by the user:
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number.parseInt(e.target.value));
        setPage(1);
    };

    // Set up how is sorted the table (ascending or not and by witch columns)
    const handleSortChange = (sortOptions: TableSortOptions<Employee> | undefined) => {
        setSortOptions(sortOptions);
    };

    // Set up the search input:

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.value) {
            setSearchInput(e.target.value);
        }
    };

    const clearSearchInput = () => {
        setFoundElement(undefined);
        inputRef.current?.reset();
    };

    // Define the differents elements of the table columns
    const columns: TableColumn<Employee>[] = [
        {
            columnName: "First Name",
            propertyName: "firstName",
        },
        {
            columnName: "Last Name",
            propertyName: "lastName",
        },
        {
            columnName: "Start Date",
            propertyName: "startDate",
        },
        {
            columnName: "Department",
            propertyName: "department",
        },
        {
            columnName: "Date of Birth",
            propertyName: "dateOfBirth",
        },
        {
            columnName: "Street",
            propertyName: "street",
        },
        {
            columnName: "City",
            propertyName: "city",
        },
        {
            columnName: "State",
            propertyName: "state",
        },
        {
            columnName: "Zip Code",
            propertyName: "zipCode",
        },
    ];

    return (
        <>
            <header className={style.header}>
                <h1 className={style.mainTitle}>HRnet</h1>
                <Link to="/" className={style.link}>
                    Home
                </Link>
            </header>
            <h2 className={style.secTitle}>Current Employees</h2>
            <main className={style.mainContainer}>
                <div className={style.nav}>
                    <SelectElement<number>
                        name="employeesPerPage"
                        label="Employees per page"
                        options={numberOfEmployeesPerPage}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        required={false}
                    />

                    <form className={style.search} ref={inputRef as LegacyRef<HTMLFormElement>}>
                        <div className={style.seachInput}>
                            <InputElement
                                label="Search"
                                onChange={handleSearchChange}
                                name="search"
                                required={false}
                                children={
                                    <button className={style.closeBtn} onClick={clearSearchInput}>
                                        X
                                    </button>
                                }
                            />
                        </div>
                    </form>
                </div>

                <TableContainer<Employee>
                    items={!foundElement ? employees : foundElement}
                    columns={columns}
                    sortOptions={sortOptions}
                    onSortChange={handleSortChange}
                />
                <div className={style.footer}>
                    <span>
                        Showing {employees.length} of {employeeCount} employees
                    </span>
                    <div className={style.prevNext}>
                        <button disabled={disabledPrevBtn} onClick={handlePreviousPage}>
                            Previous
                        </button>
                        <p>
                            {page} / {totalPages}
                        </p>
                        <button disabled={disabledNextBtn} onClick={handleNextPage}>
                            next
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
