export default interface Task {
  id: string,
  name: string,
  status: boolean,
  isUpdate: boolean,
  isLoaded: boolean,
  message: string
}

export type TaskId = Task['id']

