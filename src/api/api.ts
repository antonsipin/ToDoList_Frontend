import { ResponseTask, ResponseUser } from '../types/Response'
import { User } from '../types/User'
import { SignInUser } from '../types/SignInUser'

export async function getTasks(): Promise<any> {
  try {
    const response = await fetch('/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const tasks = await response.json()
    return tasks
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
      data: []
    }
  }
}

export async function resolveTask(id: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/task/resolve', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ id })
  })
  return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function addTask(taskName: string, taskDescription: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/task/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskName, taskDescription })
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function signUp(user: User): Promise<ResponseUser> {
    const response = await fetch('/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
  } 

export async function signIn(user: SignInUser): Promise<ResponseUser> {
    const response = await fetch('/user/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}

export async function logout(): Promise<ResponseUser> {
    const response = await fetch('/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}

export async function deleteTask(id: string): Promise<ResponseTask> {
  try {
    const response = await fetch(`/task/delete/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function updateTask(id: string, taskName: string, taskDescription: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/task/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, taskName, taskDescription })
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}
