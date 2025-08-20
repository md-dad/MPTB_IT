import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
