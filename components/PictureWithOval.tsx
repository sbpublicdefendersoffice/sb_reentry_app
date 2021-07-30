import { Color } from '../types/ui'

interface PictureWithOvalProps {
  color: Color
  pic: string
  shiftRight?: boolean
  lazy?: boolean
}

import styles from './PictureWithOval.module.css'

const PictureWithOval = ({
  color,
  pic,
  shiftRight,
  lazy,
}: PictureWithOvalProps) => (
  <div className={styles.PictureWithOval}>
    <img
      loading={lazy ? 'lazy' : 'eager'}
      style={shiftRight && { left: '3rem' }}
      className={styles.Image}
      src={`/images/${pic}`}
      alt={pic}
    />
    <div
      className={`${styles.Ellipse} ${shiftRight && styles.EllipseFlipped}`}
      style={{ backgroundColor: `var(--${color})` }}
    />
  </div>
)

export default PictureWithOval
