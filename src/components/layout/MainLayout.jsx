import Sidebar from "./Sidebar/Sidebar"
import styles from "./MainLayout.module.css"

export default function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

