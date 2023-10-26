import Form from 'react-bootstrap/Form'

interface SelectProps {
    value: string
    setTheme: (event: string) => void
}

export function Select({ value, setTheme }: SelectProps) {
  return (
    <Form.Select size='sm' onChange={(e) => setTheme(e.currentTarget.value)} aria-label="Theme select">
      <option>Theme</option>
      <option value='White'>Light</option>
      <option value='Black'>Dark</option>
    </Form.Select>
  );
}
