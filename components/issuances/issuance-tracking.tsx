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
  ArrowLeft,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReturnItemDialog } from "./return-item-dialog"
import { ViewIssuanceDialog } from "./view-issuance-dialog"

// Mock issuance data
const MOCK_ISSUANCES = [
  {
    id: "ISS001",
    itemId: "IT001",
    itemName: "Dell OptiPlex 7090",
    serialNumber: "DL7090001",
    employeeName: "Rajesh Kumar",
    employeeId: "EMP001",
    department: "Tourism Development",
    designation: "Assistant Director",
    issuedDate: "2024-01-15",
    expectedReturnDate: "2024-07-15",
    actualReturnDate: null,
    status: "Issued",
    issuedBy: "IT Manager",
    purpose: "Office work and presentations",
    condition: "Good",
    remarks: "Regular office use",
  },
  {
    id: "ISS002",
    itemId: "IT003",
    itemName: "Lenovo ThinkPad E14",
    serialNumber: "LN14001",
    employeeName: "Priya Sharma",
    employeeId: "EMP002",
    department: "Marketing",
    designation: "Marketing Executive",
    issuedDate: "2024-02-01",
    expectedReturnDate: "2024-08-01",
    actualReturnDate: "2024-02-20",
    status: "Returned",
    issuedBy: "IT Manager",
    purpose: "Field work and client presentations",
    condition: "Good",
    remarks: "Returned early due to transfer",
  },
  {
    id: "ISS003",
    itemId: "IT002",
    itemName: "HP LaserJet Pro M404n",
    serialNumber: "HP404001",
    employeeName: "Amit Patel",
    employeeId: "EMP003",
    department: "Administration",
    designation: "Office Assistant",
    issuedDate: "2024-01-20",
    expectedReturnDate: "2024-12-20",
    actualReturnDate: null,
    status: "Overdue",
    issuedBy: "IT Manager",
    purpose: "Department printing needs",
    condition: "Good",
    remarks: "Permanent assignment to admin department",
  },
]

const STATUSES = ["All", "Issued", "Returned", "Overdue", "Lost/Damaged"]
const DEPARTMENTS = ["All", "Tourism Development", "Marketing", "Administration", "Finance", "HR"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Issued":
      return "bg-blue-100 text-blue-800"
    case "Returned":
      return "bg-green-100 text-green-800"
    case "Overdue":
      return "bg-red-100 text-red-800"
    case "Lost/Damaged":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Issued":
      return <Clock className="h-4 w-4" />
    case "Returned":
      return <CheckCircle className="h-4 w-4" />
    case "Overdue":
      return <AlertTriangle className="h-4 w-4" />
    case "Lost/Damaged":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export function IssuanceTracking() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedIssuance, setSelectedIssuance] = useState<any>(null)
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

  const filteredIssuances = MOCK_ISSUANCES.filter((issuance) => {
    const matchesSearch =
      issuance.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issuance.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issuance.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issuance.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || issuance.status === selectedStatus
    const matchesDepartment = selectedDepartment === "All" || issuance.department === selectedDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleViewIssuance = (issuance: any) => {
    setSelectedIssuance(issuance)
    setShowViewDialog(true)
  }

  const handleReturnItem = (issuance: any) => {
    setSelectedIssuance(issuance)
    setShowReturnDialog(true)
  }

  const issuedCount = MOCK_ISSUANCES.filter((i) => i.status === "Issued").length
  const overdueCount = MOCK_ISSUANCES.filter((i) => i.status === "Overdue").length
  const returnedCount = MOCK_ISSUANCES.filter((i) => i.status === "Returned").length

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
                <h1 className="text-lg font-semibold text-gray-900">Issuance Tracking</h1>
                <p className="text-sm text-gray-500">Track Equipment Issuances & Returns</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/issuances/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Issuance
                </Button>
              </Link>
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
              <CardTitle className="text-sm font-medium">Total Issuances</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_ISSUANCES.length}</div>
              <p className="text-xs text-muted-foreground">All time issuances</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Currently Issued</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{issuedCount}</div>
              <p className="text-xs text-muted-foreground">Items with employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Returns</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
              <p className="text-xs text-muted-foreground">Need immediate attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returned</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{returnedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully returned</p>
            </CardContent>
          </Card>
        </div>

        {/* Issuances Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Equipment Issuances</CardTitle>
                <CardDescription>Track all equipment issued to staff members</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by item, employee, or serial number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
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
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issuance ID</TableHead>
                    <TableHead>Item Details</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssuances.map((issuance) => (
                    <TableRow key={issuance.id}>
                      <TableCell className="font-medium">{issuance.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{issuance.itemName}</div>
                          <div className="text-sm text-gray-500 font-mono">{issuance.serialNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{issuance.employeeName}</div>
                          <div className="text-sm text-gray-500">{issuance.employeeId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{issuance.department}</div>
                          <div className="text-sm text-gray-500">{issuance.designation}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(issuance.issuedDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(issuance.expectedReturnDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(issuance.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(issuance.status)}
                            {issuance.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewIssuance(issuance)}>
                            <FileText className="h-4 w-4" />
                          </Button>
                          {issuance.status === "Issued" && (
                            <Button variant="ghost" size="sm" onClick={() => handleReturnItem(issuance)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredIssuances.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No issuances found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <ReturnItemDialog open={showReturnDialog} onOpenChange={setShowReturnDialog} issuance={selectedIssuance} />
      <ViewIssuanceDialog open={showViewDialog} onOpenChange={setShowViewDialog} issuance={selectedIssuance} />
    </div>
  )
}
