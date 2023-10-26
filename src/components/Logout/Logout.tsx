import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Logout.module.scss'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import { MdOutlineLogout, MdTurnLeft } from 'react-icons/md'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { Header } from '../Header'
import { useAuth } from '../../hooks/useAuth'

export default function Logout(): JSX.Element {
    const [ isSubmit, setIsSubmit ] = useState(false)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { handleLogout, error, logout, handleError } = useAuth()

    const handleNo = () => {
        navigate(-1)
    }

    const currentLogout = useCallback(async () => {
            try {
                const response = await handleLogout()
                if (logout.fulfilled.match(response)) {
                    navigate('/')
                }
            } catch (e) {
                handleError('Something went wrong')
            }
       
    }, [handleError, handleLogout, logout.fulfilled, navigate])

    useEffect(() => {
        if (isSubmit) {
            currentLogout()
            setIsSubmit(false)
        }
    }, [setIsSubmit, isSubmit])

    return (
            <div className={cn(
                styles.Wrapper,
                styles[`Wrapper--${theme}`])
                }>
                <Header />
                <div className={styles.WrapperAlert}>
                    {error && <UserAlert error={error} onHandleError={handleError}/>}
                    
                    <div className={styles.logoutText}>
                    Do you really want to logout ?
                    </div>

                    <div className={styles.buttons}>
                        <Button 
                            onClick={() => setIsSubmit(true)} 
                            btnType='submit' 
                            children={
                                <div>
                                  Logout{' '}
                                  <MdOutlineLogout />
                                </div>
                              }
                        />
                        <span className={styles.buttonsBetweenText}>
                            or
                        </span>
                        <Button 
                            onClick={handleNo} 
                            btnType='submit' 
                            children={
                                <div>
                                  Stay logged{' '}
                                  <MdTurnLeft />
                                </div>
                              }
                        />
                    </div>
                </div>
            </div>
    )
}