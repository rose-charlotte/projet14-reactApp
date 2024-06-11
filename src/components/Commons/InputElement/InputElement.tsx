import { HTMLInputTypeAttribute } from "react";
import style from "./InputElement.module.scss";

export function InputElement(props: CheckBoxProps) {
    return (
        <label className={style.input}>
            {props.label}
            <input type={props.type ?? "text"} name={props.name} required></input>
        </label>
    );
}

export interface CheckBoxProps {
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute;
}
