export interface ITextareaProps {
  modelValue: string
  width?: string
  height?: string
  label?: string
  labelPosition?: string
  maxLength?: number | string
  placeholder?: string
  validMessage?: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  useCount?: boolean
  useDelete?: boolean
  useResize?: boolean
}
