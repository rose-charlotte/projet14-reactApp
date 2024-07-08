import { Link } from "react-router-dom";
import style from "./EmployeeListPage.module.scss";

import { TableContainer } from "../../components/Table/TableContainer/TableContainer";

import { SelectElement } from "../../components/Commons/SelectElement/SelectElement";
import { useEffect, useState } from "react";
import { Employee } from "../../data/models/Employee";
import { getPagedEmployees } from "../../data/employeeRepository";
import { TableColumn } from "../../components/Table/TableColumn";
import { TableSortOptions } from "../../components/Table/TableSortOptions";

export function EmployeeListPage() {
    const numberOfEmployeesPerPage = [5, 10, 15, 20, 50, 100];

    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = useState(1);
    const [sortOptions, setSortOptions] = useState<TableSortOptions<Employee> | undefined>();

    const [employees, setEmployees] = useState<Employee[]>();
    const [employeeCount, setEmployeeCount] = useState(0);

    const [searchInput, setSearchInput] = useState("");

    const disabledPrevBtn = page === 1;
    // Set up the number of page necessary according to the pageSize choosen:
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

            setEmployees(pagedEmployees);
            setEmployeeCount(totalEmployees);
        }

        fetchEmployees();
    }, [sortOptions, page, pageSize]);

    if (!employees) {
        return <span>Loading...</span>;
    }
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
        if (e.target.value) {
            setSearchInput(e.target.value);
        }
    };

    employees.filter(employee => {
        if (!searchInput) {
            return;
        } else if (employee.firstName.toLowerCase().includes(searchInput.toLowerCase())) {
            console.log(employee);
        }
    });

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
        <div className={style.container}>
            <h1>Current Employees</h1>
            <div className={style.elements}>
                <SelectElement<number>
                    name="employeesPerPage"
                    label="Employees per page"
                    options={numberOfEmployeesPerPage}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                />

                <div>
                    <label>Search</label>
                    <input type="text" onChange={handleSearchChange} />
                </div>
                <TableContainer<Employee>
                    items={employees}
                    columns={columns}
                    sortOptions={sortOptions}
                    onSortChange={handleSortChange}
                />

                <div>Showing {employees.length} entries</div>
            </div>

            <p>vous avez choisi {pageSize} par page</p>
            <div className={style.prevNext}>
                <button disabled={disabledPrevBtn} onClick={handlePreviousPage}>
                    Previous
                </button>
                <p>{page}</p>
                <button disabled={disabledNextBtn} onClick={handleNextPage}>
                    next
                </button>
            </div>

            <Link to="/">Home</Link>
        </div>
    );
}
