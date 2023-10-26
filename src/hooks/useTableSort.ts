import {
  useCallback, useState, useEffect, Dispatch, SetStateAction
} from 'react'
import { SortingState, ColumnSort } from '@tanstack/react-table'
import { GenericQuery } from './types/query'

export type UseTableSortOptions<TMap extends Record<string, string>> = {
  columnSortMap: TMap;
  setQuery: Dispatch<SetStateAction<GenericQuery<TMap>>>;
  initialValues?: GenericQuery<TMap>
}

const invertObject = (obj: object) => Object.fromEntries(
  Object.entries(obj)
    .map(el => el.reverse())
)

export const useTableSort = <T extends Record<string, string>>({
  columnSortMap,
  setQuery,
  initialValues,
}: UseTableSortOptions<T>) => {
  const [sorting, setSorting] = useState<SortingState>(initialValues
    ? Object.entries(initialValues)
      .filter(el => el[0].startsWith('orderBy'))
      .map(el => ({
        id: invertObject(columnSortMap)[el[0]],
        desc: String(el[1]) === 'desc'
      }))
    : [])
  const [prevSort, setPrevSort] = useState<ColumnSort| undefined>(initialValues
    ? Object.entries(initialValues)
      .filter(el => el[0].startsWith('orderBy'))
      .map(el => ({
        id: invertObject(columnSortMap)[el[0]],
        desc: String(el[1]) === 'desc'
      }))[0]
    : undefined)

  const sortTable = useCallback(
    (column: string) => {
      const sortKey = columnSortMap[column as keyof typeof columnSortMap]
      setQuery((current: any) => {
        const filtered = Object.fromEntries(Object
          .entries(current)
          .filter(el => !el[0].startsWith('orderBy')))

        if (!sortKey) {
          return {
            ...filtered,
            page: current.page,
            pageSize: current.pageSize,
          }
        }

        if (current[sortKey] === 'asc') {
          return {
            ...filtered,
            page: current.page,
            pageSize: current.pageSize,
            [sortKey]: 'desc',
          }
        }
        if (current[sortKey] === 'desc') {
          return {
            ...filtered,
            page: current.page,
            pageSize: current.pageSize,
            [sortKey]: undefined,
          }
        }

        return {
          ...filtered,
          page: current.page,
          pageSize: current.pageSize,
          [sortKey]: 'asc',
        }
      })
    },
    [columnSortMap, setQuery]
  )

  useEffect(() => {
    const val = sorting[0]
    if (!val && !prevSort) {
      return
    }

    if (JSON.stringify(prevSort) === JSON.stringify(val)) {
      return
    }
    setPrevSort(val)
    setTimeout(() => {
      sortTable(val?.id)
    })
  }, [sorting, sortTable, setPrevSort, prevSort])

  return {
    sorting,
    setSorting,
  }
}
