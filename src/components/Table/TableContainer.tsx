import { TableColumn } from "./TableColumn";
import style from "./TableContainer.module.scss";
import { TableSortOptions } from "./TableSortOptions";
import { TBody } from "./tbody/TBody";
import { THead } from "./thead/Thead";

export function TableContainer<T extends object>(props: TableContainerProps<T>) {
    return (
        <table className={style.tableContainer} data-testid={props.testid}>
            <THead<T> columns={props.columns} sortOptions={props.sortOptions} onSortChange={props.onSortChange} />
            <TBody<T> columns={props.columns} items={props.items} />
        </table>
    );
}

export interface TableContainerProps<T extends object> {
    columns: TableColumn<T>[];
    items: T[] | undefined;
    sortOptions?: TableSortOptions<T>;
    testid?: string;
    onSortChange: (options: TableSortOptions<T> | undefined) => void;
}
