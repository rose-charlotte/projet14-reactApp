export function SelectElement(props: SelectElementProps) {
    return (
        <div>
            <label>
                {props.label}
                <select name={props.name}>
                    {props.arrayOfElement.map(element => (
                        <option value={element}>{element}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export interface SelectElementProps {
    label: string;
    name: string;
    arrayOfElement: string[];
}