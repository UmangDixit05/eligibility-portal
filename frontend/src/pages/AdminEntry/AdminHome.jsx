import React from 'react'
import styles from'./css/AdminHome.module.css'

import SidebarHome from '../../elements/SidebarHome'


export default function AdminHome() {
  return (
    <>
      <div className={styles.contain}>
        <SidebarHome />
        <div className={styles.content}>
          <div className={styles.text}>Welcome Admin</div>
        </div>
      </div>
    </>
    
  )
}
