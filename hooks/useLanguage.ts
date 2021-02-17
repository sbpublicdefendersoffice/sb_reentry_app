import { createContext, useContext } from 'react'

import { AppLanguageProps } from '../types/language'

const AppLanguage = createContext<AppLanguageProps | null>(null)

export const { Provider } = AppLanguage

const useLanguage = () => useContext(AppLanguage)

export default useLanguage
