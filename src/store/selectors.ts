import RootState from '../types/RootState'

export const selectTasks = (store: RootState) => store.tasks.tasks

export const selectError = (store: RootState) => store.user.error

export const selectInfo = (store: RootState) => store.tasks.info

export const selectTasksError = (store: RootState) => store.tasks.error

export const selectUser = (store: RootState) => store.user.user
