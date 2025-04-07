"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar/Sidebar"
import styles from "./MainLayout.module.css"

export default function MainLayout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded)
  }

  return (
    <div className={`${styles.container} ${isSidebarExpanded ? styles.sidebarExpanded : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

