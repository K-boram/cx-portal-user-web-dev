export interface IInputProps {
  modelValue: string
  type?: 'text' | 'number' | 'password'
  size?: 'sm' | 'md' | 'lg'
  width?: string
  maxLength?: string
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  useBtn?: boolean
  useComma?: boolean
  useCount?: boolean
}
