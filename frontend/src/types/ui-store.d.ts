interface UiStoreDialog {
  id: string
  component: React.ReactNode
}

interface UiStore {
  isAsideOpen: boolean
  dialogs: UiStoreDialog[]
}
