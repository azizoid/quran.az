import styles from './Loader.module.scss'

export const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loadingioSpinner}>
      <div className={styles.ldio}>
        <div></div>
      </div>
    </div>
  </div>
)
