import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { Select } from '../Select/Select'
import { ThemeContext } from '../../App/ThemeContext'
import { useAuth } from '../../hooks'

const HeaderComponent = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const { handleLogout, user } = useAuth()

    const handleClick = () => {
        if (user.name || user.email) {
            handleLogout()
        }
    }

    return (
        <div className={styles.Header}>
            <Link to='/' onClick={handleClick} className={styles.MainPageLink}>Main Page</Link>
            <Link to='/signIn' onClick={handleClick} className={styles.SignInLink}>SignIn</Link>
            <Link to='/signUp'onClick={handleClick}  className={styles.SignUpLink}>SignUp</Link>
            <div className={styles.Select}>
                <Select value={theme} setTheme={setTheme} />
            </div>
        </div>
    )
}

export const Header = React.memo(HeaderComponent)