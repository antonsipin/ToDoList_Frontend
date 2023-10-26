import styles from './Info.module.scss'

interface InfoProps {
  info: boolean
  onHandleInfo: (info: boolean) => void
}

export default function Info({ info, onHandleInfo }: InfoProps): JSX.Element {
  
  return (
    <>
      {
        info && <div className={styles.Info}>Some task is already being updated. Please save it and try again.
          <button onClick={() => onHandleInfo(false)} className={styles.CloseInfo}>❌</button>
        </div>
      }
    </>
  )
}
