import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'

export default function TextField({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder: string
  type?: string
}) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <>
      <div className="input-group w-full mb-4">
        <Label htmlFor={`field_id_${field.name}`} className="mb-2">
          {label}
        </Label>
        <Input
          id={`field_id_${field.name}`}
          className="shadow-none"
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          type={type}
        />

        {errors.map((error: string) => (
          <div key={error} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
      </div>
    </>
  )
}
