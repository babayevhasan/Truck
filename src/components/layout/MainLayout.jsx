// "use client"

// import { useState, useEffect } from "react"
// import Sidebar from "./Sidebar/Sidebar"
// import styles from "./MainLayout.module.css"
// import { Outlet } from 'react-router-dom'

// export default function MainLayout() {
//   const [setWindowWidth] = useState(window.innerWidth)
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
//   const [windowWidth, setWindowWidthState] = useState(window.innerWidth)
  
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidthState(window.innerWidth)
//     }
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const handleSidebarToggle = (expanded) => {
//     setIsSidebarExpanded(expanded)
//   }

//   return (
//     <div className={`${styles.container} ${isSidebarExpanded ? styles.sidebarExpanded : ""}`}>
//       <Sidebar onToggle={handleSidebarToggle} />
//       <main className={styles.main}><Outlet/>{/* {children} */}</main>
//     </div>
//   )
// }




"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={`${styles.container} ${isSidebarExpanded ? styles.sidebarExpanded : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}



