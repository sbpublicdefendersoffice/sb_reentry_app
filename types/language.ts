export type Language = 'english' | 'spanish'

export interface AppLanguageProps {
  language: Language
  setLanguage: (language: Language) => void
}

export const ENGLISH: Language = 'english'
export const SPANISH: Language = 'spanish'
