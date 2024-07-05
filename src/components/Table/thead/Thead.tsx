import style from "./THead.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { TableColumn } from "../TableColumn";
import { TableSortOptions } from "../TableSortOptions";

export function THead<T extends object>(props: THeadProps<T>) {
    const handleSortChange = (column: TableColumn<T>) => {
        if (column.propertyName === props.sortOptions?.sortedBy) {
            if (props.sortOptions.ascending) {
                props.onSortChange({
                    ascending: false,
                    sortedBy: column.propertyName,
                });
            } else {
                props.onSortChange(undefined);
            }
        } else {
            props.onSortChange({
                ascending: true,
                sortedBy: column.propertyName,
            });
        }
    };

    return (
        <thead className={style.tabHeadContainer}>
            {props.columns.map(column => (
                <tr key={column.propertyName.toString()} className={style.row}>
                    <th className={style.th} onClick={() => handleSortChange(column)}>
                        {column.columnName}{" "}
                        {props.sortOptions && props.sortOptions.sortedBy === column.propertyName ? (
                            props.sortOptions.ascending ? (
                                <FontAwesomeIcon icon={faArrowDownShortWide} />
                            ) : (
                                <FontAwesomeIcon icon={faArrowDownWideShort} />
                            )
                        ) : null}
                    </th>
                </tr>
            ))}
        </thead>
    );
}
export type THeadProps<T extends object> = {
    columns: TableColumn<T>[];
    sortOptions?: TableSortOptions<T>;
    onSortChange: (options: TableSortOptions<T> | undefined) => void;
};
