import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context.tsx'
import { Label } from './ui/label.tsx'
import { PhoneInput } from './ui/phone-input.tsx'

export default function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <>
      <div className="input-group w-full mb-4">
        <Label htmlFor={`field_id_${field.name}`} className="mb-2">
          {label}
        </Label>

        <PhoneInput
          id={`field_id_${field.name}`}
          value={field.state.value}
          placeholder='99 999 99 99'
          onChange={(e) => field.handleChange(e.toString())}
          onBlur={field.handleBlur}
          defaultCountry="UZ"
          countries={['UZ']}
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
