import { ProtectedRoute } from "@/components/auth/protected-route"
import { InventoryManagement } from "@/components/inventory/inventory-management"

export default function InventoryPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin", "manager_it"]}>
      <InventoryManagement />
    </ProtectedRoute>
  )
}
