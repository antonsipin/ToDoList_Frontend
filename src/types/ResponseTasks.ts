import Task from './Task'

export default interface ResponseTasks {
    result: string,
    error: string,
    data: Task[]
}