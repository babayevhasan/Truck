"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Sidebar.module.css"
import IconSvg from "../../../assets/icons/icon.svg?react"
import DashboardIcon from "../../../assets/icons/dashboard.svg?react"
import SettingsIcon from "../../../assets/icons/settings.svg?react"
import PackageIcon from "../../../assets/icons/package.svg?react"
import TruckIcon from "../../../assets/icons/truck.svg?react"
import MessageIcon from "../../../assets/icons/message.svg?react"
import UsersIcon from "../../../assets/icons/users.svg?react"
import UserIcon from "../../../assets/icons/user.svg?react"
import ChevronLeftIcon from "../../../assets/icons/left.svg?react"
import { useWindowWidth } from '../useWindowWidth'

const MenuIcon = () => (
  <svg
    className={styles.menuIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function Sidebar({ onToggle,}) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const onResizeWindow = (windowInnerWidth) => {
    
    if (windowInnerWidth > 768) {
      setIsMobileMenuOpen(false)
    }
  }
  const { windowWidth} = useWindowWidth(onResizeWindow);
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (onToggle) {
      onToggle(isExpanded)
    }
  }, [isExpanded, onToggle])

  const isActive = (path) => {
    return location.pathname === path
  }
// duz deyil
  const getIcon = (iconName) => {
    
    switch (iconName) {
      case "dashboard":
        return <DashboardIcon />
      case "settings":
        return <SettingsIcon />
      case "package":
        return <PackageIcon />
      case "truck":
        return <TruckIcon />
      case "message":
        return <MessageIcon />
      case "users":
        return <UsersIcon />
      case "user":
        return <UserIcon />
      case "chart":
        return <IconSvg />
      default:
        return null
    }
  }

  const navItems = [
    { /* icon: "dashboard", */ label: "Dashboard", path: "/" , icon: <DashboardIcon /> },
    { icon: "settings", label: "Seçim Konfiqurasiyası", path: "/configuration" },
    { icon: "package", label: "Yük elanları", path: "/freight-announcements" },
    { icon: "truck", label: "Yük maşını elanları", path: "/vehicle-announcements" },
    { icon: "message", label: "Mesajlar", path: "/messages" },
    { icon: "users", label: "Operatorlar", path: "/operators" },
    { icon: "user", label: "İstifadəçilər", path: "/users" },
    { icon: "chart", label: "Tranzaksiya", path: "/transactions" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const toggleExpand = () => {
    const newExpandedState = !isExpanded
    setIsExpanded(newExpandedState)
    if (onToggle) {
      onToggle(newExpandedState)
    }
  }
  
  
  if (windowWidth > 768) {
    return (
      <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : ""}`}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                {/* sehvdi */}
                <Link to={item.path} className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.collapseButton}>
          <button className={styles.iconButton} onClick={toggleExpand}>
            <ChevronLeftIcon />
          </button>
        </div>
      </aside>
    )
  }

  return (
    <>
      <button className={styles.burgerButton} onClick={toggleMobileMenu}>
        <MenuIcon />
      </button>

      <div className={`${styles.mobileSidebar} ${isMobileMenuOpen ? styles.mobileSidebarOpen : ""}`}>
        <div className={styles.mobileMenuHeader}>
          <button className={styles.mobileCloseButton} onClick={toggleMobileMenu}>
            <CloseIcon />
          </button>
        </div>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.mobileNavItem}>
                {/* sehvdi */}
                <a
                  href={item.path}
                  className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.mobileActive : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getIcon(item.icon)}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}



