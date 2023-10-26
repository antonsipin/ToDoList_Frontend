import React, { useState } from 'react'
import styles from './Form.module.scss'
import cn from 'classnames'
import { useTasks } from '../../hooks'
import {  useForm, SubmitHandler, FieldValues } from 'react-hook-form'

function Form (): JSX.Element {
  const [inputError, setInputError] = useState<string>('')
  const { handleCreateTask, handleError, handleInfo } = useTasks()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = data => {
        if (data.task) {
          handleCreateTask({task: data.task, taskDescription: data.taskDescription})
          handleError('')
          handleInfo(false)
          setInputError('')
          reset()
        } else {
          handleInfo(false)
          handleError('Can not add empty task')
          setInputError('error')
        }
  }

    return (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.Wrapper}>
                <label className={styles.Label}>
                  Task&Description
                </label>
                <input
                  placeholder='Task name' 
                  className={cn(
                    styles.InputWrapper,
                    styles[`InputWrapper--${inputError}`]
                    )}
                  {...register('task')} 
                />

                <input 
                  placeholder='Task description' 
                  className={cn(
                    styles.InputWrapper
                    )}
                  {...register("taskDescription")} 
                />
                <input 
                  className={styles.btn}
                  type="submit" 
                  value={`Add task`}
                />
          </form>
    )
}

export default React.memo(Form)