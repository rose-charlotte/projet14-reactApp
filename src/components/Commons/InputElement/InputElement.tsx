export function InputElement(props: CheckBoxProps) {
    return (
        <div>
            <label>
                {props.label}
                <input type="text" name={props.name}></input>
            </label>
        </div>
    );
}

export interface CheckBoxProps {
    label: string;
    name: string;
}
