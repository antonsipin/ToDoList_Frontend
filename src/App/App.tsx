import React, { useState } from 'react'
import TasksList from '../pages/TasksList/TasksList'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import MainPage from '../pages/MainPage/MainPage'
import Logout from '../components/Logout/Logout'
import TaskCard from '../pages/TaskCard/TaskCard'
import { ThemeContext } from '../App/ThemeContext'
import { TableModeContext } from '../App/TableModeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import styles from './App.module.scss'

interface FallbackComponentType {
  error: { message: string }
  resetErrorBoundary: () => void
}

function FallbackComponent({ error, resetErrorBoundary } : FallbackComponentType) {
  return (
    <div className={styles.error} role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App(): JSX.Element {
  const queryClient = new QueryClient()
  const [theme, setTheme] = useState('White')
  const [tableMode, setTableMode] = useState(false)

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state here
      }}
      resetKeys={['someKey']}
    >
        <TableModeContext.Provider value={{ tableMode, setTableMode }}>
          <ThemeContext.Provider value={{ theme, setTheme }} >
            <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path='/' element={<MainPage />} />
                  <Route path='/signIn' element={<SignIn />}/>
                  <Route path='/signUp' element={<SignUp />}/>
                  <Route path='/tasks' element={<TasksList />}/>
                  <Route path='/tasks/:id' element={<TaskCard />} />
                  <Route path='/logout' element={<Logout />}/>
                </Routes>
            </QueryClientProvider>
          </ThemeContext.Provider>
        </TableModeContext.Provider>
    </ErrorBoundary>
  )
}

export default React.memo(App)
