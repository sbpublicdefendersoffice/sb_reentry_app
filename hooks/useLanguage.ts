import { createContext, useContext } from 'react'

export type Language = 'english' | 'spanish'

interface AppLanguageProps {
  language: Language
  setLanguage: (language: Language) => void
}

const AppLanguage = createContext<AppLanguageProps | null>(null)

export const { Provider } = AppLanguage

const useLanguage = () => useContext(AppLanguage)

export default useLanguage
