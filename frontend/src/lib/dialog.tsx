import { uiStore } from '@/data/ui-store'

export default function addDialog(dialog: UiStoreDialog) {
  uiStore.setState((s) => ({ ...s, dialogs: [...s.dialogs, dialog] }))
}
