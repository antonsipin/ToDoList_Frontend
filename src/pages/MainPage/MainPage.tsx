import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.scss'
import cn from 'classnames'
import { Button } from '../../components/Button'
import { MdFlightTakeoff } from 'react-icons/md'
import { ThemeContext } from '../../App/ThemeContext'
import { Header } from '../../components/Header'

function MainPage(): JSX.Element {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const handleStart = () => {
        navigate('/signIn')
    }
    return (
        <div className={cn(
            styles.Wrapper,
            styles[`Wrapper--${theme}`]
            )}>
            <Header />
            <div className={styles.Body}>
                <div className={styles.ToDoList}>
                    ToDo List
                </div> 
                <div className={styles.Text}>
                    Helper to plan your tasks
                </div>
                <Button 
                    onClick={handleStart} 
                    children={
                        <div>
                          Start{' '}
                          <MdFlightTakeoff />
                        </div>
                    } 
                    btnType={'start'}
                />
            </div>
        </div>
    )
}

export default React.memo(MainPage)