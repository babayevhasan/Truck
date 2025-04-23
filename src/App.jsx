import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import FreightAnnouncements from "./pages/FreightAnnouncements/FreightAnnouncements"
import VehicleAnnouncements from "./pages/VehicleAnnouncements/VehicleAnnouncements"
import VehicleAnnouncement from "./pages/VehicleAnnouncements/VehicleAnnouncement"

export default function App() {
  // Layout duz deyil
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route
            path=""
            element={
                <div>Dashboard</div>
            }
          />

          <Route
            path="freight-announcements"
            element={
                <FreightAnnouncements />
            }
          />
          <Route
            path="vehicle-announcements"
            element={<VehicleAnnouncements />}
          />
        </Route>
        
        <Route
          path="/vehicle-announcements/:id"
          element={
            <MainLayout>
              <VehicleAnnouncement />
            </MainLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <MainLayout>
              <div>Messages</div>
            </MainLayout>
          }
        />
        <Route
          path="/operators"
          element={
            <MainLayout>
              <div>Operators</div>
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <div>Users</div>
            </MainLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <MainLayout>
              <div>Transactions</div>
            </MainLayout>
          }
        />
        <Route
          path="/configuration"
          element={
            <MainLayout>
              <div>Configuration</div>
            </MainLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}


