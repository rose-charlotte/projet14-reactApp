import { TBody } from "../tbody/TBody";
import { THead } from "../thead/Thead";
import style from "./TableContainer.module.scss";
import { TableColumn } from "../TableColumn";
import { TableSortOptions } from "../TableSortOptions";

export function TableContainer<T extends object>(props: TableContainerProps<T>) {
    return (
        <table className={style.tableContainer}>
            <THead<T> columns={props.columns} sortOptions={props.sortOptions} onSortChange={props.onSortChange} />
            <TBody<T> columns={props.columns} items={props.items} />
        </table>
    );
}

export interface TableContainerProps<T extends object> {
    columns: TableColumn<T>[];
    items: T[] | undefined;
    sortOptions?: TableSortOptions<T>;
    onSortChange: (options: TableSortOptions<T> | undefined) => void;
}
