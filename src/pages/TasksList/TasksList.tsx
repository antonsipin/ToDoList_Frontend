import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Task from '../../types/Task'
import Form from '../../components/Form/Form'
import NoTasks from '../../components/NoTasks/NoTasks'
import styles from './TasksList.module.scss'
import '../../components/Logout' 
import useTasks from '../../hooks/useTasks'    
import TaskComponent from '../../components/TaskComponent/TaskComponent'
import { MaterialTable } from '../../components/TasksTable'
import { Spinner } from '../../components/Loader'
import cn from 'classnames'
import Button from '../../components/Button'
import ReactPaginate from 'react-paginate'
import { AlertComponent } from '../../components/Alert'
import { MdOutlineList, MdOutlineViewList } from 'react-icons/md'
import { Select } from '../../components/Select/Select'
import { ThemeContext } from '../../App/ThemeContext'
import { TableModeContext } from '../../App/TableModeContext'
import { useAuth } from '../../hooks/useAuth'

function TasksList(): JSX.Element {
  const { info, error, tasks, handleGetTasks, handleInfo, handleError } = useTasks()
  const DEFAULT_PAGE_SIZE = 8
  const { theme, setTheme } = useContext(ThemeContext)
  const { tableMode, setTableMode } = useContext(TableModeContext)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + DEFAULT_PAGE_SIZE
  const currentItems = useMemo(() => tasks.slice(itemOffset, endOffset), [tasks, itemOffset, endOffset])
  const pageCount = Math.ceil(tasks.length / DEFAULT_PAGE_SIZE)
  const [isLoaded, setIsLoaded] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    handleGetTasks()

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePageClick = useCallback((event: any) => {
    const newOffset = (event.selected * DEFAULT_PAGE_SIZE) % tasks.length
    setItemOffset(newOffset)
  }, [tasks.length])

  return (
    <div className={cn(
      styles.Wrapper,
      styles[`Wrapper--${theme}`]
      )}>
      <div className={styles.header}>
        <Link to='/logout' className={styles.LogoutLink}>Logout</Link>
        <div className={styles.Select}>
          <Select value={theme} setTheme={setTheme} />
        </div>
          <div className={styles.switchModeBtn}>
            <Button 
              onClick={() => setTableMode(!tableMode)} 
              children={
                tableMode ?
                  <div>
                    Switch mode{' '}
                    <MdOutlineList />
                  </div> :
                  <div>
                    Switch mode{' '}
                    <MdOutlineViewList />
                  </div>
              } 
              btnType={'mode'}
            />
          </div>
      <span className={styles.userName}>
        {`Good job, ${user.name}!`}
      </span>
      </div>

      {info || error ?
      <div className={styles.Alert}>
        <AlertComponent 
      error={error} 
      info={info} 
      onHandleInfo={handleInfo} 
      onHandleError={handleError}/>
      </div> : ''}

      <Form />

      {tableMode ? (
        !isLoaded ?
        <div className={styles.loader}>
          <Spinner />
        </div>:
        <div>
          {currentItems.length ? <div
          className={cn(
            styles.tableWrapper, 
            styles[`tableWrapper--${theme}`]
            )}
          >
            <MaterialTable tasks={currentItems} />
          </div>:
           <NoTasks />
           }
        </div>
      ) : (
        <div className={styles.taskWrapper}>
        {   !isLoaded ? 
            <div className={styles.loader}>
            <Spinner />
            </div> : (
              currentItems.length ?  
              currentItems.map(
              (task: Task) => <TaskComponent key={task.id} task={task} />
              ): 
                <NoTasks />
            )
        }
              {isLoaded && 
              <div className={styles.Paginate}>
                  <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
              }
      </div>
      )
      }
    </div>
  )
}

export default React.memo(TasksList)
