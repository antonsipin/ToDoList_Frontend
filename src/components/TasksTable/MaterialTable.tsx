import React, { useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table"
import Task from '../../types/Task'
import { ThemeContext } from '../../App/ThemeContext'

export const columns: MRT_ColumnDef<Task>[] = [
    {
      header: 'Task Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'message',
    },
  ]

  export function MaterialTable({ tasks }: any) {
    const { theme } = useContext(ThemeContext)
    const tasksData: Task[] = useMemo(() => tasks || [], [tasks])
    const navigate = useNavigate()

    const handleClick = (id: string) => {
        const taskId = tasksData[Number(id)].id
        navigate(`/tasks/${taskId}`)
    }

    return (
            <MaterialReactTable
            columns={columns}
            data={tasksData}
            enableRowNumbers
            rowNumberMode='static'
            enableFullScreenToggle={false}
            initialState={{ density: 'comfortable' }}
            muiTableBodyRowProps={({ row }) => ({
                onClick: () => handleClick(row.id),
                sx: {
                cursor: 'pointer',
                backgroundColor: theme === 'White' ? 'white' : 'rgb(80, 80, 80)',
                },
            })}
            muiTableHeadCellProps={() => ({
              sx: {
                backgroundColor: theme === 'White' ? 'white' : 'rgb(80, 80, 80)',
              },
            })}
            muiTablePaginationProps={() => ({
              sx: {
                backgroundColor: theme === 'White' ? 'white' : 'rgb(80, 80, 80)',
              },
            })}
            />
    );
  }