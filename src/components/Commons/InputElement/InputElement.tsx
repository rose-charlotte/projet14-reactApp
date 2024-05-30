import style from "./InputElement.module.scss";

export function InputElement(props: CheckBoxProps) {
    return (
        <label className={style.input}>
            {props.label}
            <input type="text" name={props.name}></input>
        </label>
    );
}

export interface CheckBoxProps {
    label: string;
    name: string;
}
