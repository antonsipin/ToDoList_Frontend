import styles from './NoTasks.module.scss'

export default function NoTask(): JSX.Element {
    return (
        <>
            <div className={styles.NoTasks}>
                Let's add a task!
            </div>
        </>
    )
}