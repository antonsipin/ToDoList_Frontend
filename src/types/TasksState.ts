import Task from './Task'

export type TasksState = {
    tasks: Task[],
    info: boolean,
    error: string
}