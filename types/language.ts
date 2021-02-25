export type Language = 'english' | 'spanish'

export interface AppLanguageProps {
  language: Language
  // eslint-disable-next-line no-unused-vars
  setLanguage: (language: Language) => void
}

export interface CopyHolder {
  english: { [key: string]: string }
  spanish: { [key: string]: string }
}

export const ENGLISH: Language = 'english'
export const SPANISH: Language = 'spanish'
