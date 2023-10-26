import Task, { TaskId } from './Task'
import { RegUser } from './RegUser'

type Action = 
| { type: 'tasks/getTasks', payload: Task[] }
| { type: 'tasks/createTask', payload: Task }
| { type: 'tasks/resolveTask', payload: TaskId }
| { type: 'tasks/updateTask', payload: {
    taskId: TaskId,
    updateInput: { taskName: string, taskDescription: string }
} }
| { type: 'tasks/deleteTask', payload: TaskId }
| { type: 'updateInputs/hideInput', payload: TaskId } 
| { type: 'user/createUser', payload: RegUser } 

export default Action