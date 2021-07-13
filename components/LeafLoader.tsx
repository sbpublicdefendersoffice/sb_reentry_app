import styles from './LeafLoader.module.css'

const LeafLoader = () => (
  <div role="none" className={styles.LeafLoader}>
    <img role="img" src="/images/leaf.svg" className={styles.leaf} />
  </div>
)

export default LeafLoader
