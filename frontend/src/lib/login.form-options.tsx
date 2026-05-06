import { formOptions } from '@tanstack/react-form'

export const loginFormOpts = formOptions({
  defaultValues: {
    username: '',
    password: '',
  },
  validators: {
    onSubmit: ({ value }) => {
      if (!value.username) {
        return 'Foydalanuvchi nomi kiritish majburiy'
      }
      if (!value.password) {
        return 'Parol kiritish majburiy'
      }
      return undefined
    },
  },
})