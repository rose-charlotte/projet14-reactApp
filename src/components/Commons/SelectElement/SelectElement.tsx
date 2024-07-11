import style from "./SelectElelement.module.scss";

export function SelectElement<T extends string | number>(props: SelectElementProps<T>) {
    return (
        <div>
            <label className={style.select}>
                {props.label}
                <select name={props.name} value={props.value} onChange={props.onChange} required={props.required}>
                    {props.options.map(element => (
                        <option value={element} key={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export interface SelectElementProps<T extends string | number> {
    label: string;
    name: string;
    options: T[];
    value?: T;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required: boolean;
}
