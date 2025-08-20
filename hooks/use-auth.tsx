"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "super_admin" | "manager_it"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for authentication
const DEMO_USERS = {
  "admin@mptb.gov.in": {
    id: "1",
    email: "admin@mptb.gov.in",
    name: "System Administrator",
    role: "super_admin" as UserRole,
    password: "admin123",
  },
  "manager@mptb.gov.in": {
    id: "2",
    email: "manager@mptb.gov.in",
    name: "IT Manager",
    role: "manager_it" as UserRole,
    password: "manager123",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("mp-tourism-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS]

    if (!demoUser || demoUser.password !== password || demoUser.role !== role) {
      throw new Error("Invalid credentials")
    }

    const user = {
      id: demoUser.id,
      email: demoUser.email,
      name: demoUser.name,
      role: demoUser.role,
    }

    setUser(user)
    localStorage.setItem("mp-tourism-user", JSON.stringify(user))

    // Redirect based on role
    if (role === "super_admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/manager/dashboard")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mp-tourism-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
