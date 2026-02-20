import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'

const resources = {
  en: { translation: en },
  es: { translation: es },
}

const getLocale = () => {
  try {
    // We use require here to prevent a top-level crash if the native module is missing
    const Localization = require('expo-localization')
    const locales = Localization.getLocales()
    if (locales && locales.length > 0) {
      const locale = locales[0].languageCode
      return locale === 'es' ? 'es' : 'en'
    }
  } catch (e) {
    console.warn(
      'Localization native module not found or failed, falling back to English:',
      e,
    )
  }
  return 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
