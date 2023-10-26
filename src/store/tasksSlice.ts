import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TasksState } from '../types/TasksState'
import Task from '../types/Task'
import * as api from '../api'
import { DELETE_TASK, RESOLVE_TASK, GET_TASKS, CREATE_TASK, UPDATE_TASK } from './types'
import { sortByName } from '../utils/sort'

export const initialTasksState: TasksState = {
    tasks: [],
    info: false,
    error: ''
}

export const getTasks = createAsyncThunk(GET_TASKS, () => api.getTasks())

export const resolveTask = createAsyncThunk(RESOLVE_TASK, (id: string) => api.resolveTask(id))

export const deleteTask = createAsyncThunk(DELETE_TASK, (id: string) => api.deleteTask(id))

export const createTask = createAsyncThunk(CREATE_TASK, ({taskName, taskDescription}: {taskName: string, taskDescription: string}) => api.addTask(taskName, taskDescription))

export const updateTask = createAsyncThunk(UPDATE_TASK, ({
    taskId: id, updateInput: {taskName, taskDescription}
}: {
    taskId: string, updateInput: {taskName: string, taskDescription: string}
}) => api.updateTask(id, taskName, taskDescription))

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        hideInput(state: TasksState, action: PayloadAction<string>) {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    task.isUpdate = !task.isUpdate
                } 
                return task
            })
        },
        setError(state: TasksState, action: PayloadAction<string>) {
            state.error = action.payload || ''
        },
        setInfo(state: TasksState, action: PayloadAction<boolean>) {
            state.info = action.payload || false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getTasks.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = action.payload.data.sort(sortByName())
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                resolveTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = state.tasks.map((task) => {
                            if (task.id === action.payload.data?.id) {
                                task.status = !task.status
                            }
                            return task
                        })
                    } else {
                        state.error = 'Something went wrong'
                    }
                } 
            )
            .addCase(
                deleteTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = state.tasks.filter((task) => task.id !== action.payload.data?.id)
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                createTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        state.tasks = [...state.tasks, action.payload.data].sort(sortByName())
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
            .addCase(
                updateTask.fulfilled,
                (state, action) => {
                    if (action.payload.result === 'Error' && action.payload.error) {
                        state.error = action.payload.error
                    } else if (action.payload.result === 'Successfully' && action.payload.data) {
                        const oldTask = state.tasks.find((task) => task.id === action.payload.data?.id)
                        Object.assign(oldTask as Task, action.payload.data)
                        state.tasks = state.tasks.sort(sortByName())
                    } else {
                        state.error = 'Something went wrong'
                    }
                }
            )
    }
})

export const { setInfo, setError, hideInput } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer