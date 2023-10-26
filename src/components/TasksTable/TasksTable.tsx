import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'
import { GlobalFilter } from './filters'
import React, { useMemo } from 'react'
import Task from '../../types/Task'
import styles from './TasksTable.module.scss'
import { Column, useTable, useGlobalFilter, useFilters, SortByFn, useSortBy } from 'react-table'
import { DefaultColumnFilter, filterTypes } from './filters'

export const columns: Column<Task>[] = [
  {
    Header: 'ID',
    accessor: 'id',
    sortType: 'number'
  },
  {
    Header: 'Task Name',
    accessor: 'name',
    sortType: 'string',
  },
]

const sortTypes: Record<string, SortByFn<Task>> = {
  string: (rowA, rowB, columnId, desc) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string
    ]

    return a.localeCompare(b, 'en')
  }
}

export const defaultColumn = {
  Filter: DefaultColumnFilter,
  filter: 'text'
}

export const TasksTable = function ({ tasks }: any): JSX.Element {
    const tasksData: Task[] = useMemo(() => tasks || [], [tasks])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter
    } = useTable(
      { columns, data: tasksData, defaultColumn, filterTypes, sortTypes },
      useGlobalFilter,
      useFilters,
      useSortBy
    )

    return (
      <div>
        <div className='table-wrapper'>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((hG: any) => (
                <tr {...hG.getHeaderGroupProps()}>
                  {hG.headers.map((col: any) => (
                    <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                      {col.render('Header')}{' '}
                      {col.canSort && (
                      <span>
                        {col.isSorted ? (
                          col.isSortedDesc ? (
                            <BiSortUp />
                          ) : (
                            <BiSortDown />
                          )
                        ) : (
                          <BiSortAlt2 />
                        )}
                      </span>
                    )}
                    </th>
                  ))}
                </tr>
              ))}
              <tr>
                <th colSpan={visibleColumns.length}>
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, i: any) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()}
                      onClick={() => console.log(`clicked ${cell}`)}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
}
