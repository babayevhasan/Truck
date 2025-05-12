"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import FreightAnnouncements from "./pages/FreightAnnouncements/FreightAnnouncements";
import Profile from "./pages/Profile/Profile";
import VehicleAnnouncements from "./pages/VehicleAnnouncements/VehicleAnnouncements";
import VehicleAnnouncement from "./pages/VehicleAnnouncements/VehicleAnnouncement";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notifications from "./pages/Notifications/Notifications";

import Login from "./pages/registr/Login";
import Signin from "./pages/registr/Signin";
import Forgot from "./pages/registr/Forgot";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot" element={<Forgot />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<Dashboard />} />
              <Route path="profile" element={< Profile />} />
              <Route path="freight-announcements" element={<FreightAnnouncements />} />
              <Route path="vehicle-announcements" element={<VehicleAnnouncements />} />
              <Route path="vehicle-announcements/:id" element={<VehicleAnnouncement />} />
              <Route path="messages" element={<Notifications />} />
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





