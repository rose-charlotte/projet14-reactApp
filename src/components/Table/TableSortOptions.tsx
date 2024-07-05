export interface TableSortOptions<T extends object> {
    sortedBy: keyof T;
    ascending: boolean;
}
