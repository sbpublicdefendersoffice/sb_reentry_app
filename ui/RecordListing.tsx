import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './RecordListing.module.css'

interface RecordListingProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const RecordListing = forwardRef<HTMLElement, RecordListingProps>(
  function Listing(props: RecordListingProps, ref) {
    const { children, ...other } = props
    return (
      <article ref={ref} className={styles.RecordListing} {...other}>
        {children}
      </article>
    )
  },
)

export default RecordListing
