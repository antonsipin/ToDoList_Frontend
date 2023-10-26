import { SortDirection } from '@tanstack/react-table'

export interface TableColumnProps {
    className?: string
    sort?: SortDirection | false
    onClickSort?: (event: unknown) => void
}