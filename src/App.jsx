// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import MainLayout from "./components/layout/MainLayout"
// import FreightAnnouncements from "./pages/FreightAnnouncements/FreightAnnouncements"
// import VehicleAnnouncements from "./pages/VehicleAnnouncements/VehicleAnnouncements"
// import VehicleAnnouncement from "./pages/VehicleAnnouncements/VehicleAnnouncement"

// export default function App() {
 
//   return (
//     <Router>
//       <Routes>

//         <Route path='/' element={<MainLayout />}>
//           <Route
//             path=""
//             element={<div>Dashboard</div>}
//           />

//           <Route
//             path="freight-announcements"
//             element={<FreightAnnouncements />}
//           />
//           <Route
//             path="vehicle-announcements"
//             element={<VehicleAnnouncements />}
//           />

//           <Route
//             path="vehicle-announcements/:id"
//             element={<VehicleAnnouncement />} />

//           <Route
//            path="messages"
//             element={<div>Messages</div>} />

//           <Route
//            path="operators"
//             element={<div>Operators</div>} />

//           <Route
//            path="users"
//             element={<div>Users</div>} />

//           <Route
//            path="transactions"
//             element={<div>Transactions</div>} />

//           <Route
//            path="configuration"
//             element={<div>Configuration</div>} />
//         </Route>

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   )
// }


"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import FreightAnnouncements from "./pages/FreightAnnouncements/FreightAnnouncements";
import VehicleAnnouncements from "./pages/VehicleAnnouncements/VehicleAnnouncements";
import VehicleAnnouncement from "./pages/VehicleAnnouncements/VehicleAnnouncement";
import Login from "./pages/registr/Login";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<div>Dashboard</div>} />
              <Route path="freight-announcements" element={<FreightAnnouncements />} />
              <Route path="vehicle-announcements" element={<VehicleAnnouncements />} />
              <Route path="vehicle-announcements/:id" element={<VehicleAnnouncement />} />
              <Route path="messages" element={<div>Messages</div>} />
              <Route path="operators" element={<div>Operators</div>} />
              <Route path="users" element={<div>Users</div>} />
              <Route path="transactions" element={<div>Transactions</div>} />
              <Route path="configuration" element={<div>Configuration</div>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}





