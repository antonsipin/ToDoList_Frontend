import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import { TableColumnProps } from './types'
import { IconAsc, IconDesc } from '../icons'
import styles from './TableColumn.module.scss'

export const TableColumn = ({
    sort,
    className,
    children,
    onClickSort
}: PropsWithChildren<TableColumnProps>) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <div className={cn(styles.text)}>
                {children}
            </div>
            {sort !== undefined && (
                <div
                    onClick={onClickSort}
                    className={cn(styles.iconWrapper, {
                        [styles.active]: sort
                    })}
                >
                    {sort === 'asc' ? (
                        <IconAsc className={styles.icon}/>
                    ) : (
                        <IconDesc className={styles.icon}/>
                    )}
                </div>
            )}
        </div>
    )
} 