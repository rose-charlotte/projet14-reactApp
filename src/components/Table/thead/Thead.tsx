import style from "./THead.module.scss";

export function THead() {
    const tableElements = [
        "First Name",
        "Last Name",
        "Start Date",
        "Department",
        "Date of Birth",
        "Street",
        "City",
        "State",
        "Zip Code",
    ];
    return (
        <thead className={style.tabHeadContainer}>
            {tableElements.map((ele, index) => (
                <tr key={index} className={style.row}>
                    {ele}
                </tr>
            ))}
        </thead>
    );
}
