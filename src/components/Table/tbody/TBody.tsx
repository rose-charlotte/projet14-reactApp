import style from "./Tbody.module.scss";
import { TableColumn } from "../TableColumn";

export function TBody<T extends object>(props: BodyProps<T>) {
    function stringify(value: unknown): string {
        if (typeof value === "string") {
            return value;
        }

        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        if (typeof value === "bigint") {
            return value.toString();
        }

        if (typeof value === "boolean") {
            return value ? "true" : "false";
        }

        if (typeof value === "number") {
            return value.toString();
        }

        if (typeof value === "object" && value !== null && typeof value.toString === "function") {
            return value.toString();
        }

        return "";
    }
    return (
        <tbody className={style.tbodyContainer2}>
            {props.items &&
                props.items.map((item, index) => (
                    <tr className={style.tr} key={index} data-testid={`tr-${index}`}>
                        {props.columns.map(column => (
                            <td
                                className={style.tbodyTd}
                                key={column.columnName}
                                data-testid={`tr-${index}_td-${column.propertyName.toString()}`}
                            >
                                {stringify(item[column.propertyName])}
                            </td>
                        ))}
                    </tr>
                ))}
        </tbody>
    );
}

export interface BodyProps<T extends object> {
    items: T[] | undefined;
    columns: TableColumn<T>[];
}
