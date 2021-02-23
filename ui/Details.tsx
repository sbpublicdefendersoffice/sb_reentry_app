import { useEffect, ReactNode, forwardRef, DetailsHTMLAttributes } from 'react'

import styles from './Details.module.css'

interface DetailsProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  children: ReactNode
  summary: string
}

const Details = forwardRef<HTMLDetailsElement, DetailsProps>(
  function DetailsFunc(props: DetailsProps, ref) {
    const { children, summary, className, ...other } = props

    useEffect(() => {
      const openDetailsOnLargeScreen = (): void => {
        // @ts-ignore
        const detailsDomElement: HTMLDetailsElement = document.getElementById(
          'details-element',
        )
        if (!detailsDomElement.open && innerWidth >= 700)
          detailsDomElement.open = true
      }

      addEventListener('resize', openDetailsOnLargeScreen)

      return () => removeEventListener('resize', openDetailsOnLargeScreen)
    }, [])

    return (
      <details
        ref={ref}
        className={`${styles.Details} ${className}`}
        id="details-element"
        {...other}
      >
        <summary className={styles.summary}>{summary}</summary>
        {children}
      </details>
    )
  },
)

export default Details
