export type Language = 'english' | 'spanish'

export interface AppLanguageProps {
  language: Language
  setLanguage: (language: Language) => void
}
