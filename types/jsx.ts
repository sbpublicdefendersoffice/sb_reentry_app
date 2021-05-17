import 'react'

declare module 'react' {
  // eslint-disable-next-line no-unused-vars
  export interface HTMLAttributes<T> {
    open?: boolean
  }
}
