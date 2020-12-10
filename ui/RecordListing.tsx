import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './RecordListing.module.css'

interface RecordListingProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  interactive?: boolean
}

const RecordListing = forwardRef<HTMLElement, RecordListingProps>(
  function Listing(props: RecordListingProps, ref) {
    const { children, interactive, className, ...other } = props
    return (
      <article
        ref={ref}
        className={`${styles.RecordListing} ${
          interactive ? styles.active : ''
        } ${className ? className : ''}`}
        {...other}
      >
        {children}
      </article>
    )
  },
)

export default RecordListing
