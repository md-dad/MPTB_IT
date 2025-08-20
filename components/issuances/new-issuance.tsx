"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Plus, User, Package } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock data for available items and employees
const AVAILABLE_ITEMS = [
  { id: "IT001", name: "Dell OptiPlex 7090", serialNumber: "DL7090001", category: "Desktop" },
  { id: "IT004", name: "Cisco Catalyst 2960", serialNumber: "CS2960001", category: "Network Equipment" },
  { id: "IT005", name: "HP EliteBook 840", serialNumber: "HP840001", category: "Laptop" },
]

const EMPLOYEES = [
  { id: "EMP001", name: "Rajesh Kumar", department: "Tourism Development", designation: "Assistant Director" },
  { id: "EMP004", name: "Sunita Verma", department: "Finance", designation: "Accountant" },
  { id: "EMP005", name: "Vikash Singh", department: "HR", designation: "HR Executive" },
]

const DEPARTMENTS = ["Tourism Development", "Marketing", "Administration", "Finance", "HR", "IT"]

export function NewIssuance() {
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    itemId: "",
    employeeId: "",
    employeeName: "",
    department: "",
    designation: "",
    purpose: "",
    expectedReturnDate: undefined as Date | undefined,
    condition: "Good",
    remarks: "",
  })

  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const handleItemSelect = (itemId: string) => {
    const item = AVAILABLE_ITEMS.find((i) => i.id === itemId)
    setSelectedItem(item)
    setFormData({ ...formData, itemId })
  }

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = EMPLOYEES.find((e) => e.id === employeeId)
    if (employee) {
      setSelectedEmployee(employee)
      setFormData({
        ...formData,
        employeeId,
        employeeName: employee.name,
        department: employee.department,
        designation: employee.designation,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to database
    console.log("Creating new issuance:", formData)
    router.push("/issuances")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
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
                <h1 className="text-lg font-semibold text-gray-900">New Equipment Issuance</h1>
                <p className="text-sm text-gray-500">Issue equipment to staff member</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Equipment Issuance Form
            </CardTitle>
            <CardDescription>Fill out the details to issue equipment to a staff member</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Item Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Select Equipment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item">Available Items *</Label>
                    <Select value={formData.itemId} onValueChange={handleItemSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an item to issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_ITEMS.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-gray-500">
                                {item.serialNumber} - {item.category}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedItem && (
                    <div className="space-y-2">
                      <Label>Selected Item Details</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{selectedItem.name}</p>
                        <p className="text-sm text-gray-600">Serial: {selectedItem.serialNumber}</p>
                        <p className="text-sm text-gray-600">Category: {selectedItem.category}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Employee Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Employee Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee">Select Employee *</Label>
                    <Select value={formData.employeeId} onValueChange={handleEmployeeSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {EMPLOYEES.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{employee.name}</span>
                              <span className="text-sm text-gray-500">
                                {employee.designation} - {employee.department}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Employee Name</Label>
                    <Input
                      id="employeeName"
                      value={formData.employeeName}
                      onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                      placeholder="Enter employee name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
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
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="Enter designation"
                    />
                  </div>
                </div>
              </div>

              {/* Issuance Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Issuance Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expected Return Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.expectedReturnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.expectedReturnDate
                            ? format(formData.expectedReturnDate, "PPP")
                            : "Select return date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.expectedReturnDate}
                          onSelect={(date) => setFormData({ ...formData, expectedReturnDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Item Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Issuance *</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="Describe the purpose for issuing this equipment"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Additional Remarks</Label>
                  <Textarea
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    placeholder="Any additional notes or special instructions"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Issue Equipment</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
