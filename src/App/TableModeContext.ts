import { createContext } from 'react'

interface TableModeType {
    tableMode: boolean
    setTableMode: (tableMode: boolean) => void
}

export const TableModeContext = createContext<TableModeType>({ tableMode: false, setTableMode: () => {}})
