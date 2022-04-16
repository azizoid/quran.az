import React from 'react'

import styles from './LoadingBoxes.module.scss'

export const LoadingBoxes = (): JSX.Element => (
  <div className={styles.loadingBoxes}>
    <div className={styles.ldsFacebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)
