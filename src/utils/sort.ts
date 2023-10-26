import Task from '../types/Task'

export const sortByName = () => (a: Task, b: Task) => a.name.localeCompare(b.name)