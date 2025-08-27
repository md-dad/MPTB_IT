"use client";

import type React from "react";

import { useAuth, User, type UserRole } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push("/");
        return;
      }

      if (
        user &&
        allowedRoles &&
        !allowedRoles.includes(user.app_metadata?.role)
      ) {
        // Redirect to appropriate dashboard if user doesn't have permission
        if (user.app_metadata?.role === "super_admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/manager/dashboard");
        }
      }
    }
    init();
  }, [allowedRoles, router]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.app_metadata?.role)) {
    return null;
  }

  return <>{children}</>;
}
