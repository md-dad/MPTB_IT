import { LoginForm } from "@/components/auth/login-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    // Get user profile to determine role
    const { data: profile } = await supabase.from("users").select("role").eq("email", session.user.email).single()

    if (profile?.role === "super_admin") {
      redirect("/admin/dashboard")
    } else if (profile?.role === "manager_it") {
      redirect("/manager/dashboard")
    } else {
      redirect("/admin/dashboard") // Default fallback
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* MP Tourism Logo and Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <Image
                src="https://tourism.mp.gov.in/assets/img/tourism-logo.svg"
                alt="Madhya Pradesh Tourism Board"
                width={120}
                height={60}
                className="mx-auto filter brightness-0"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">IT Inventory Management System</h1>
            <p className="text-sm text-gray-600">Madhya Pradesh Tourism Board</p>
            <p className="text-xs text-gray-500 mt-1">6th Floor, Lily Trade Wing, Jahangirabad, Bhopal–462008</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
