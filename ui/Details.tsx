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
        const detailsDomElements: NodeList = document.querySelectorAll(
          '.details-element',
        )
        if (innerWidth >= 700)
          detailsDomElements.forEach((ele: HTMLDetailsElement): void => {
            if (!ele.open) ele.open = true
          })
      }

      addEventListener('resize', openDetailsOnLargeScreen)

      return () => removeEventListener('resize', openDetailsOnLargeScreen)
    }, [])

    return (
      <details
        ref={ref}
        className={`${styles.Details} ${className} details-element`}
        {...other}
      >
        <summary role="definition" className={styles.summary}>
          {summary}
        </summary>
        {children}
      </details>
    )
  },
)

export default Details
