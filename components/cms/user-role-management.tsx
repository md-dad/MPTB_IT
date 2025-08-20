"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Users, Shield, Edit, Trash2, Key } from "lucide-react"

// Mock role data
const MOCK_ROLES = [
  {
    id: "ROLE001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: ["user_management", "inventory_management", "system_settings", "cms_management", "reports"],
    createdDate: "2024-01-01",
  },
  {
    id: "ROLE002",
    name: "Manager IT",
    description: "IT operations and inventory management",
    userCount: 5,
    permissions: ["inventory_management", "issuance_tracking", "reports"],
    createdDate: "2024-01-01",
  },
  {
    id: "ROLE003",
    name: "Staff",
    description: "Basic access for staff members",
    userCount: 16,
    permissions: ["view_inventory", "request_equipment"],
    createdDate: "2024-01-01",
  },
]

const AVAILABLE_PERMISSIONS = [
  { id: "user_management", name: "User Management", description: "Manage system users and roles" },
  { id: "inventory_management", name: "Inventory Management", description: "Full inventory CRUD operations" },
  { id: "issuance_tracking", name: "Issuance Tracking", description: "Issue and track equipment" },
  { id: "system_settings", name: "System Settings", description: "Configure system settings" },
  { id: "cms_management", name: "CMS Management", description: "Manage content and notifications" },
  { id: "reports", name: "Reports & Analytics", description: "Generate and view reports" },
  { id: "view_inventory", name: "View Inventory", description: "Read-only inventory access" },
  { id: "request_equipment", name: "Request Equipment", description: "Submit equipment requests" },
]

export function UserRoleManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId],
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating role:", formData)
    setShowCreateDialog(false)
    setFormData({ name: "", description: "", permissions: [] })
  }

  return (
    <div className="space-y-6">
      {/* Role Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">User Role Management</h3>
          <p className="text-sm text-gray-600">Manage user roles and permissions</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new user role with specific permissions</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and its purpose"
                  rows={3}
                />
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 gap-4 max-h-60 overflow-y-auto">
                  {AVAILABLE_PERMISSIONS.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Role</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Roles
          </CardTitle>
          <CardDescription>All user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role ID</TableHead>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ROLES.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-mono text-sm">{role.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{role.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Users className="h-3 w-3 mr-1" />
                        {role.userCount}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {AVAILABLE_PERMISSIONS.find((p) => p.id === permission)?.name}
                          </Badge>
                        ))}
                        {role.permissions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{role.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(role.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
