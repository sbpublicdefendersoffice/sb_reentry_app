interface PictureWithOvalProps {
  color: string
  pic: string
}

import styles from './PictureWithOval.module.css'

const PictureWithOval = ({ color, pic }: PictureWithOvalProps) => {
  return (
    <div className={styles.PictureWithOval}>
      <img className={styles.Image} src={`/images/${pic}`} />
      <div className={styles.Ellipse} style={{ backgroundColor: color }} />
    </div>
  )
}

export default PictureWithOval
