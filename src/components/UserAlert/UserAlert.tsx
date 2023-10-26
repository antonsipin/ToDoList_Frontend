import Alert from 'react-bootstrap/Alert'
import styles from './UserAlert.module.scss'
import { Button } from '../../components/Button'

interface AlertProps {
  error: string
  onHandleError: (error: string) => void
}

function UserAlert ({ error, onHandleError }: AlertProps) {
  return (
    <div>
      {[
        'info',
      ].map((variant) => (
            <Alert key={variant} variant={variant}>
              {error || `Something went wrong`}
                {error && 
                <span className={styles.Wrapper}>
                  <Button onClick={() => onHandleError('')} btnType='submit' children={'Ok. Got it.'} />
                </span>
                }
            </Alert>
      ))}
    </div>
  )
}

export default UserAlert