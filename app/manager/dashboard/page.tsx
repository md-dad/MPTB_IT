import { ProtectedRoute } from "@/components/auth/protected-route"
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard"

export default function ManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["manager_it"]}>
      <ManagerDashboard />
    </ProtectedRoute>
  )
}
