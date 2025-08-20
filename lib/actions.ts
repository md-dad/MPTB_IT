"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Sign in function for MP Tourism Board system
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toString(),
    password: password.toString(),
  })

  if (error) {
    console.log("[v0] Authentication error:", error.message)
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Authentication failed" }
  }

  console.log("[v0] User authenticated successfully:", data.user.email)

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("email", email.toString())
    .single()

  if (profileError || !profile) {
    console.log("[v0] Profile not found, using email-based role detection")
    // Fallback role detection based on email for demo
    if (email.toString().includes("admin")) {
      redirect("/admin/dashboard")
    } else if (email.toString().includes("manager")) {
      redirect("/manager/dashboard")
    } else {
      redirect("/admin/dashboard")
    }
  } else {
    console.log("[v0] User role:", profile.role)
    if (profile.role === "super_admin") {
      redirect("/admin/dashboard")
    } else if (profile.role === "manager_it") {
      redirect("/manager/dashboard")
    } else {
      redirect("/admin/dashboard")
    }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  await supabase.auth.signOut()
  redirect("/")
}
