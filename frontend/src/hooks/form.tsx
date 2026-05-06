import { createFormHook } from '@tanstack/react-form'
import { lazy } from 'react'
import { fieldContext, formContext, useFormContext } from './form-context.tsx'

const TextField = lazy(() => import('@/components/text-field.tsx'))
const PhoneField = lazy(() => import('@/components/phone-field.tsx'))
const SelectField = lazy(() => import('@/components/select-field.tsx'))


function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    PhoneField,
    SelectField
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
