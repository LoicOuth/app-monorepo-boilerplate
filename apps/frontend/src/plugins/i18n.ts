import { createI18n, type PluralizationRule } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import LocalStorageHelper from '@/services/local_storage_helper'

const messages = {
  fr: fr,
  en: en,
}
const availableLocales = Object.keys(messages)
const savedLocale = LocalStorageHelper.get(LocalStorageHelper.LocalStorageUserPreferencesKey.Locale)

const detectBrowserLanguage = (): string => {
  const browserLocale = navigator.language.split('-')[0]

  if (availableLocales.includes(browserLocale)) {
    return browserLocale
  }

  return 'fr'
}

const locale = savedLocale || detectBrowserLanguage()

const pluralRules: { [key: string]: PluralizationRule } = {
  en: (choice: number) => {
    return choice === 1 ? 0 : 1
  },
  fr: (choice: number) => {
    return choice >= 2 ? 1 : 0
  },
}

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'fr',
  messages,
  pluralRules,
})
