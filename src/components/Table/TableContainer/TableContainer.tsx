import { THead } from "../thead/Thead";
import style from "./TableContainer.module.scss";

export function TableContainer() {
    return (
        <table className={style.tableContainer}>
            <THead />
        </table>
    );
}
