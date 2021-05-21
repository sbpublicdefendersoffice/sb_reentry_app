import { Color } from '../types/ui'

interface PictureWithOvalProps {
  color: Color
  pic: string
}

import styles from './PictureWithOval.module.css'

const PictureWithOval = ({ color, pic }: PictureWithOvalProps) => (
  <div className={styles.PictureWithOval}>
    <img className={styles.Image} src={`/images/${pic}`} />
    <div
      className={styles.Ellipse}
      style={{ backgroundColor: `var(--${color})` }}
    />
  </div>
)

export default PictureWithOval
