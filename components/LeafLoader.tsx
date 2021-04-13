import FreshStartLeaf from '../ui/FreshStartLeaf'

import styles from './LeafLoader.module.css'

const LeafLoader = () => (
  <div role="none" className={styles.LeafLoader}>
    <FreshStartLeaf role="img" className={styles.leaf} />
  </div>
)

export default LeafLoader
