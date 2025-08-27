import { ProtectedRoute } from "@/components/auth/protected-route";
import { IssuanceTracking } from "@/components/issuances/issuance-tracking";

export default function IssuancesPage() {
  return (
    <ProtectedRoute allowedRoles={["super_admin", "manager"]}>
      <IssuanceTracking />
    </ProtectedRoute>
  );
}
