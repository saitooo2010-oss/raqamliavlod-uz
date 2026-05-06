import { formOptions } from '@tanstack/react-form'

export const registerFormOpts = formOptions({
  defaultValues: {
    first_name: '',
    last_name: '',
    username: '',
    region: '',
    district: '',
    phone: '',
    telegram: '',
    school: '',
    password: '',
    password_confirm: '',
  },
  validators: {
    onSubmit: ({ value }) => {
      if (value.password !== value.password_confirm) {
        return 'Parollar mos kelmaydi'
      }
      if (value.password.length < 8) {
        return 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak'
      }
      return undefined
    },
  },
})
