import { Title } from '../../ui'
import LetUsHelpHeading from '../LetUsHelpHeading'
import PictureWithOval from '../PictureWithOval'
import styles from './FreshStartLanding.module.css'

const FreshStartLanding = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <PictureWithOval color="peri" pic="resourcesWomenPic.jpg" />
        <Title>Fresh Start</Title>
      </div>
    </div>
  )
}

export default FreshStartLanding

{
  /* <div className={styles.Container}>
      <div className={styles.Header}>
        <PictureWithOval color="peri" pic="resourcesWomenPic.jpg" />
        <div className={styles.HeaderText}>
          <Title>Fresh Start</Title>
        </div>
      </div>
    </div> */
}
