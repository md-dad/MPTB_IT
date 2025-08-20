"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, FileText, LogOut, User, Plus, Search, TrendingUp, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ManagerDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Image
                src="https://tourism.mp.gov.in/assets/img/tourism-logo.svg"
                alt="MP Tourism"
                width={40}
                height={20}
                className="filter brightness-0"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">IT Inventory Management</h1>
                <p className="text-sm text-gray-500">Manager Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge variant="outline" className="text-xs">
                  <User className="h-3 w-3 mr-1" />
                  Manager IT
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h2>
          <p className="text-gray-600">Manage IT inventory and track issuances for MP Tourism Board</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">Ready for issuance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issued Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Items need restocking</p>
            </CardContent>
          </Card>
        </div>

        {/* Manager Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Item
              </CardTitle>
              <CardDescription>Add new IT equipment to inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Add Item</Button>
            </CardContent>
          </Card>

          <Link href="/inventory">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Inventory
                </CardTitle>
                <CardDescription>Find and manage existing inventory items</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Search Items</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/issuances/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Issue Equipment
                </CardTitle>
                <CardDescription>Issue equipment to staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">New Issuance</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/issuances">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Track Issuances
                </CardTitle>
                <CardDescription>View and manage all equipment issuances</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Issuances</Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Generate Reports
              </CardTitle>
              <CardDescription>Create inventory and issuance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Stock Alerts
              </CardTitle>
              <CardDescription>Manage low stock and maintenance alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Alerts</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
