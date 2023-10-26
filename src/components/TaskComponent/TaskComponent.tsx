import React, { useState } from 'react'
import Task from '../../types/Task'
import { Link } from 'react-router-dom'
import styles from './TaskComponent.module.scss'
import { Button } from '../Button'
import { UpdateInput } from '../UpdateInput/UpdateInput'
import { MdEditOff, MdDoneOutline, MdRemoveDone, MdEditSquare, MdDeleteOutline } from 'react-icons/md'
import useTasks from '../../hooks/useTasks'  

function TaskComponent({task}: {task : Task}): JSX.Element {
  const [updateTaskName, setUpdateTaskName] = useState<string>('')
  const [updateTaskDescription, setUpdateTaskDescription] = useState<string>('')
  const { handleDelete, handleUpdate, handleResolve, handleHide } = useTasks()

    return (
            <div className={styles.Wrapper} >
                  <div className={styles.taskAndInput}>
                    <Link to={`/tasks/${task.id}`}>
                        <span className={task.status ? styles['Task--resolved'] : styles.Task}>{task.name}</span>
                    </Link>
                    { task.isUpdate && 
                      <div className={styles.updateInputs}>
                        <UpdateInput 
                          taskPlaceholder={'Task name'}
                          taskDescriptionPlaceholder={'Task Description'}
                          task={updateTaskName}
                          taskDescription={updateTaskDescription}
                          setTask={setUpdateTaskName}
                          setTaskDescription={setUpdateTaskDescription}
                        />
                      </div>
                    }
                  </div>

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
                    task.isUpdate && !updateTaskName.length ? 
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
                      onClick={() => handleUpdate(task.id, updateTaskName, updateTaskDescription)} 
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
                      onClick={() =>handleDelete(task.id)} 
                      children={
                        <div>
                          Delete{' '}
                          <MdDeleteOutline />
                        </div>
                      }
                      btnType='delete'
                    />
                  </div>
                </div>
    )
}

export default React.memo(TaskComponent)
