import Alert from 'react-bootstrap/Alert'
import styles from './AlertComponent.module.scss'
import { Button } from '../../components/Button'

interface AlertProps {
  info?: boolean
  error?: string
  onHandleInfo: (info: boolean) => void
  onHandleError: (error: string) => void
}

function AlertComponent ({ error, info, onHandleInfo, onHandleError }: AlertProps) {
  return (
    <div>
      {[
        'info',
      ].map((variant) => (
            <Alert key={variant} variant={variant}>
              <div className={styles.Wrapper}>
                {error || `Some task is already being updated. Please save it and try again.`}
                {info && <Button onClick={() => onHandleInfo(false)} btnType='submit' children={'Ok! Got it.'} />}
                {error && <Button onClick={() => onHandleError('')} btnType='submit' children={'Ok! Got it.'} />}
              </div>
            </Alert>
      ))}
    </div>
  )
}

export default AlertComponent