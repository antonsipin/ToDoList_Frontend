import { RegUser } from './RegUser';
import Task from '../types/Task'

export interface State {
    tasks: Task[]
    user: RegUser
}
