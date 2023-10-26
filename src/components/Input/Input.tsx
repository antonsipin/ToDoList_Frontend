import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

interface InputProps {
  taskPlaceholder: string
  taskDescriptionPlaceholder: string
  task: string
  taskDescription: string
  setTask: (task: string) => void
  setTaskDescription: (taskDescription: string) => void
}

export function Input({ taskPlaceholder, taskDescriptionPlaceholder, task, taskDescription, setTask, setTaskDescription } : InputProps) {
  return (
    <InputGroup size='sm' className="mb-3">
      <InputGroup.Text>{taskPlaceholder}{' '}{'&'}{' '}{taskDescriptionPlaceholder}</InputGroup.Text>
      <Form.Control onChange={(e) => setTask(e.target.value)} placeholder={taskPlaceholder} value={task} />
      <Form.Control onChange={(e) => setTaskDescription(e.target.value)} placeholder={taskDescriptionPlaceholder} value={taskDescription} />
    </InputGroup>
  )
}
