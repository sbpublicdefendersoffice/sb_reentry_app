import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './RecordListing.module.css'

interface RecordListingProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  interactive?: boolean
  border?: boolean
}

const RecordListing = forwardRef<HTMLElement, RecordListingProps>(
  function Listing(props: RecordListingProps, ref) {
    let { border, children, interactive, className, ...other } = props
    if (border === undefined) border = true

    return (
      <article
        ref={ref}
        className={`${styles.RecordListing} ${interactive && styles.active} ${
          className && className
        } ${border && styles.border}`}
        {...other}
        role="listitem"
      >
        {children}
      </article>
    )
  },
)

export default RecordListing
