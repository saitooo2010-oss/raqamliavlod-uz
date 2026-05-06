import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context.tsx'
import { Label } from './ui/label.tsx'
import {Select, SelectContent, SelectTrigger, SelectValue} from './ui/select.tsx'
import type {JSX} from 'react'

export default function SelectField({
  label,
  placeholder,
  children,
}: {
  label: string
  placeholder: string
  children: JSX.Element
}) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <>
    <div className="input-group w-full mb-4">
    <Label htmlFor={`field_id_${field.name}`} className="mb-2">
    {label}
    </Label>
    <Select value={field.state.value} onValueChange={field.handleChange} onOpenChange={(open) => open && field.handleBlur()}>
    <SelectTrigger className='w-full shadow-none'>
      <SelectValue id={`field_id_${field.name}`} placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {children}
    </SelectContent>
    </Select>

    {errors.map((error: string) => (
      <div key={error} style={{ color: 'red' }}>
      {error}
      </div>
    ))}
    </div>
    </>
  )
}
