import { ProtectedRoute } from "@/components/auth/protected-route"
import { CMSDashboard } from "@/components/cms/cms-dashboard"

export default function CMSPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <CMSDashboard />
    </ProtectedRoute>
  )
}
