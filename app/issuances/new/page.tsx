import { ProtectedRoute } from "@/components/auth/protected-route"
import { NewIssuance } from "@/components/issuances/new-issuance"

export default function NewIssuancePage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin", "manager_it"]}>
      <NewIssuance />
    </ProtectedRoute>
  )
}
