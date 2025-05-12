// import React from "react"
// import ReactDOM from "react-dom/client"
// import App from "./App"
// import "./index.css"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { NotificationProvider } from "./context/NotificationContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
)


