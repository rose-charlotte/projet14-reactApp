import { HTMLInputTypeAttribute, ReactNode } from "react";
import style from "./InputElement.module.scss";

export function InputElement(props: CheckBoxProps) {
    return (
        <div className={style.container}>
            <label>{props.label} </label>
            <div className={style.inputContainer}>
                <input
                    className={style.input}
                    type={props.type ?? "text"}
                    name={props.name}
                    onChange={props.onChange}
                    required={props.required}
                    aria-label={props.label}
                ></input>
                {props.children}
            </div>
        </div>
    );
}

export interface CheckBoxProps {
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
    required: boolean;
}
