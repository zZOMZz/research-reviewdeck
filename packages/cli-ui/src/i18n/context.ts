import { createContext } from 'react'

import type { I18nMessages, Locale } from './types'

export type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: I18nMessages
}

export const I18nContext = createContext<I18nContextValue | null>(null)
