import style from "./Tbody.module.scss";

export function TBody() {
    return (
        <tbody className={style.tbodyContainer}>
            <tr className={style.tr}>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
                <td className={style.tbodyTd}>td</td>
            </tr>
        </tbody>
    );
}
