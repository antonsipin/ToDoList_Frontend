import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.scss'
import Form from 'react-bootstrap/Form'
import { Button } from '../../components/Button'
import UserAlert from '../UserAlert'
import { User } from '../../types/User'
import { validateEmail } from '../../utils/validate'
import { MdOutlineChevronRight } from 'react-icons/md'
import cn from 'classnames'
import { ThemeContext } from '../../App/ThemeContext'
import { Header } from '../Header'
import { useAuth } from '../../hooks/useAuth'
import * as api from '../../api'

function SignUp(): JSX.Element {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')
    const [ isSubmit, setIsSubmit ] = useState(false)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { error, handleError, handleRegister, register } = useAuth()

    const signUp = useCallback(async ({ name, email, password }: User) => {
        try {
            if (name.trim() && email.trim() && password.trim() ) {
                if (validateEmail(email)) {
                    const response = await handleRegister({ name, email, password })
                    if (register.fulfilled.match(response)) {
                        navigate('/signIn')
                    }
                } else {
                    handleError('Invalid email format')
                }
            } else {
                handleError('All fields must be filled')
            }
        } catch (e) {
            handleError(String(e))
        }
    }, [])

    useEffect(() => {
        if (isSubmit) {
            signUp({ name, email, password })
            setIsSubmit(false)
        }
    }, [setIsSubmit, isSubmit])

    return (
        <div className={cn(
            styles.Wrapper,
            styles[`Wrapper--${theme}`]
            )}>
            <Header />
            <div className={styles.WrapperAlertForm}>
                    {error && <UserAlert error={error} onHandleError={handleError}/>}
                    <Form>
                        <Form.Group style={{color: 'grey'}} className="mb-3" controlId="text">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={name}
                                placeholder="Enter your name" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <Form.Text className="text-muted" />
                        </Form.Group>

                        <Form.Group style={{color: 'grey'}} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                value={email}
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <Form.Text className="text-muted" />
                        </Form.Group>

                        <Form.Group style={{color: 'grey'}} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                        btnType={'submit'} 
                        children={
                            <div>
                              Register{' '}
                              <MdOutlineChevronRight />
                            </div>
                          }
                        onClick={() => setIsSubmit(true)} 
                        />
                    </Form>
            </div>
        </div>
    )
}

export default React.memo(SignUp)