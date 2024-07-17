export interface TableColumn<T extends object> {
    columnName: string;
    propertyName: keyof T;
}
