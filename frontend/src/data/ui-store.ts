import { Store } from '@tanstack/store'
import { useSyncExternalStore } from 'react'

export const uiStore = new Store<UiStore>({
  isAsideOpen: true,
  dialogs: [],
})

export function useUiStore<T>(selector: (state: UiStore) => T) {
  const getSnapshot = () => selector(uiStore.state)
  return useSyncExternalStore(uiStore.subscribe, getSnapshot, getSnapshot)
}
