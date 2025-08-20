"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  ArrowLeft,
  Monitor,
  Laptop,
  Printer,
  Router,
  Smartphone,
  HardDrive,
} from "lucide-react"
import Image from "next/image"
import { AddItemDialog } from "./add-item-dialog"
import { ViewItemDialog } from "./view-item-dialog"
import { EditItemDialog } from "./edit-item-dialog"

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: "IT001",
    name: "Dell OptiPlex 7090",
    category: "Desktop",
    brand: "Dell",
    model: "OptiPlex 7090",
    serialNumber: "DL7090001",
    status: "Available",
    location: "IT Store Room",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2026-01-15",
    price: 45000,
    specifications: "Intel i5, 8GB RAM, 256GB SSD",
  },
  {
    id: "IT002",
    name: "HP LaserJet Pro M404n",
    category: "Printer",
    brand: "HP",
    model: "LaserJet Pro M404n",
    serialNumber: "HP404001",
    status: "Issued",
    location: "Admin Office",
    purchaseDate: "2023-02-20",
    warrantyExpiry: "2025-02-20",
    price: 15000,
    specifications: "Monochrome Laser Printer, Network Ready",
  },
  {
    id: "IT003",
    name: "Lenovo ThinkPad E14",
    category: "Laptop",
    brand: "Lenovo",
    model: "ThinkPad E14",
    serialNumber: "LN14001",
    status: "Under Maintenance",
    location: "Service Center",
    purchaseDate: "2023-03-10",
    warrantyExpiry: "2026-03-10",
    price: 55000,
    specifications: "Intel i7, 16GB RAM, 512GB SSD",
  },
  {
    id: "IT004",
    name: "Cisco Catalyst 2960",
    category: "Network Equipment",
    brand: "Cisco",
    model: "Catalyst 2960",
    serialNumber: "CS2960001",
    status: "Available",
    location: "Network Room",
    purchaseDate: "2023-04-05",
    warrantyExpiry: "2028-04-05",
    price: 25000,
    specifications: "24-Port Gigabit Switch",
  },
]

const CATEGORIES = ["All", "Desktop", "Laptop", "Printer", "Network Equipment", "Mobile Device", "Storage"]
const STATUSES = ["All", "Available", "Issued", "Under Maintenance", "Retired"]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Desktop":
      return <Monitor className="h-4 w-4" />
    case "Laptop":
      return <Laptop className="h-4 w-4" />
    case "Printer":
      return <Printer className="h-4 w-4" />
    case "Network Equipment":
      return <Router className="h-4 w-4" />
    case "Mobile Device":
      return <Smartphone className="h-4 w-4" />
    case "Storage":
      return <HardDrive className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800"
    case "Issued":
      return "bg-blue-100 text-blue-800"
    case "Under Maintenance":
      return "bg-yellow-100 text-yellow-800"
    case "Retired":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function InventoryManagement() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const filteredInventory = MOCK_INVENTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleViewItem = (item: any) => {
    setSelectedItem(item)
    setShowViewDialog(true)
  }

  const handleEditItem = (item: any) => {
    setSelectedItem(item)
    setShowEditDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Image
                src="https://tourism.mp.gov.in/assets/img/tourism-logo.svg"
                alt="MP Tourism"
                width={40}
                height={20}
                className="filter brightness-0"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-500">Manage IT Equipment & Assets</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                {user?.role === "super_admin" ? "Super Admin" : "Manager IT"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_INVENTORY.length}</div>
              <p className="text-xs text-muted-foreground">Active inventory items</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {MOCK_INVENTORY.filter((item) => item.status === "Available").length}
              </div>
              <p className="text-xs text-muted-foreground">Ready for issuance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issued</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {MOCK_INVENTORY.filter((item) => item.status === "Issued").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently in use</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Package className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {MOCK_INVENTORY.filter((item) => item.status === "Under Maintenance").length}
              </div>
              <p className="text-xs text-muted-foreground">Under repair</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>Manage and track all IT equipment and assets</CardDescription>
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, serial number, or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Inventory Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand/Model</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.brand}</div>
                          <div className="text-sm text-gray-500">{item.model}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <AddItemDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <ViewItemDialog open={showViewDialog} onOpenChange={setShowViewDialog} item={selectedItem} />
      <EditItemDialog open={showEditDialog} onOpenChange={setShowEditDialog} item={selectedItem} />
    </div>
  )
}
