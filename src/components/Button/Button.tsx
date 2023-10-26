import React from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'

interface ButtonProps {
    onClick?: () => void
    onClickForm?: (e: React.FormEvent) => void
    children: React.ReactNode
    btnType: string
}

export const Button = ({onClickForm, onClick, children, btnType}: ButtonProps): JSX.Element => {
    return (
        <>
            <button 
                type='button' 
                className={cn(
                    styles.btn, 
                    styles[`btn--${btnType}`]
                    )} 
                onClick={onClick || onClickForm}>
                    <div className={cn(
                    styles[`btn--children`]
                    )}>
                        {children}
                    </div>
            </button>
        </>
    )
}