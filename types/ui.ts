export type Color =
  | 'light'
  | 'dark'
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'light-2'
  | 'light-blue'
  | 'highlight-2'
  | 'deselected'
  | 'med-grey'

export type TextSize =
  | 'standard-text'
  | 'med-text'
  | 'heading-text'
  | 'large-text'

export interface UseToastProps {
  toast: string
  // eslint-disable-next-line no-unused-vars
  setToast: (toast: any) => void
}

export interface WindowSize {
  width: number
  height: number
}
