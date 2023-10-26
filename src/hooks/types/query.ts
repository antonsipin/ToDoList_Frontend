export type GenericQuery<T extends Record<string, string>> = {
    page: number;
    pageSize: number;
} & {
    [K in T[keyof T]]?: 'asc' | 'desc';
}
