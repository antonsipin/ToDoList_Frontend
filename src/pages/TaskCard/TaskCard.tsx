import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useTasks from '../../hooks/useTasks'
import { Button } from '../../components/Button'
import styles from './TaskCard.module.scss' 
import { MdEditOff, MdDoneOutline, MdRemoveDone, MdEditSquare, MdDeleteOutline, MdTurnLeft } from 'react-icons/md'
import { UpdateInput } from '../../components/UpdateInput/UpdateInput'
import { AlertComponent } from '../../components/Alert'
import { ThemeContext } from '../../App/ThemeContext'
import cn from 'classnames'
import { Header } from '../../components/Header'
import Task from '../../types/Task'

function TaskCard(): JSX.Element {
    const { info, error, tasks, handleInfo, handleError, handleGetTasks, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
    const navigate = useNavigate()
    const params = useParams()
    const id = String(params.id)
    const [taskName, setTaskName] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
      handleGetTasks()
      }, [])

    const handleBack = () => navigate(-1)
    const task = tasks.find((task: Task) => task.id === id)

    const currentHandleDelete = (id: string) => {
        handleDelete(id)
        handleBack()
    }

    return (
        <div 
        className={cn(
          styles.Wrapper,
          styles[`Wrapper--${theme}`]
          )}
        >
          <Header />
          {info || error ?
              <AlertComponent 
                error={error} 
                info={info} 
                onHandleInfo={handleInfo} 
                onHandleError={handleError}
                />: ''}

          <div className={styles.taskCard}>
            <div className={task?.status ? 
              cn(
                styles.TaskName,
                styles[`TaskName--resolved`], 
                ) : 
              styles.TaskName}>{task?.name}
            </div>

            <div className={styles.taskDescription}>Description: {task?.message}</div>
            {
              task && task.isUpdate && 
                    <div className={styles.updateInputs}>
                      <UpdateInput 
                        taskPlaceholder={'Task name'}
                        taskDescriptionPlaceholder={'Task Description'}
                        task={taskName}
                        taskDescription={taskDescription}
                        setTask={setTaskName}
                        setTaskDescription={setTaskDescription}
                      />
                    </div>
            }

            {task &&          
            <div className={styles.buttons}>
                  {
                    <Button 
                    onClick={() => handleResolve(task.id)} 
                    children={
                      task.status ?
                        <div>
                          UnResolve{' '}
                          <MdRemoveDone />
                        </div> :
                        <div>
                          Resolve{' '}
                          <MdDoneOutline />
                        </div>
                    } 
                    btnType={'resolve'}
                  />
                  }
                  {
                    task.isUpdate && !taskName.length ? 
                    <Button 
                    onClick={() => handleHide(task.id)}
                    children={
                      <div>
                        Hide input{' '}
                        <MdEditOff />
                      </div>
                    }
                    btnType='hide'
                    />:
                    <Button 
                      onClick={() => handleUpdate(task.id, taskName, taskDescription)} 
                      children={
                        <div>
                          Update{' '}
                        <MdEditSquare />
                      </div>
                      } 
                      btnType='update'
                    />
                  }
                  <Button 
                      onClick={() => currentHandleDelete(task.id)} 
                      children={
                        <div>
                          Delete{' '}
                          <MdDeleteOutline />
                        </div>
                      }
                      btnType='delete'
                    />
                  <Button 
                      onClick={handleBack} 
                      children={
                        <div>
                          Back{' '}
                          <MdTurnLeft />
                        </div>
                      }
                      btnType='back'
                    />
                </div>
            }
          </div>  
        </div>
        
    )
}

export default React.memo(TaskCard)