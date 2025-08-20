"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Bell, Send, Eye, Trash2, AlertCircle, Info, CheckCircle } from "lucide-react"

// Mock notification data
const MOCK_NOTIFICATIONS = [
  {
    id: "NOT001",
    title: "System Maintenance Scheduled",
    message: "System will be under maintenance on Sunday from 2 AM to 6 AM",
    type: "Warning",
    status: "Active",
    createdDate: "2024-01-15",
    recipients: "All Users",
    views: 45,
  },
  {
    id: "NOT002",
    title: "New Equipment Added",
    message: "New Dell laptops have been added to inventory",
    type: "Info",
    status: "Sent",
    createdDate: "2024-01-18",
    recipients: "IT Staff",
    views: 23,
  },
  {
    id: "NOT003",
    title: "Policy Update Required",
    message: "Please review and acknowledge the updated IT policy",
    type: "Alert",
    status: "Draft",
    createdDate: "2024-01-20",
    recipients: "All Users",
    views: 0,
  },
]

const NOTIFICATION_TYPES = ["Info", "Warning", "Alert", "Success"]
const RECIPIENT_GROUPS = ["All Users", "IT Staff", "Managers", "Admins"]

const getTypeColor = (type: string) => {
  switch (type) {
    case "Info":
      return "bg-blue-100 text-blue-800"
    case "Warning":
      return "bg-yellow-100 text-yellow-800"
    case "Alert":
      return "bg-red-100 text-red-800"
    case "Success":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "Sent":
      return "bg-blue-100 text-blue-800"
    case "Draft":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Info":
      return <Info className="h-4 w-4" />
    case "Warning":
      return <AlertCircle className="h-4 w-4" />
    case "Alert":
      return <AlertCircle className="h-4 w-4" />
    case "Success":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export function NotificationCenter() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "Info",
    recipients: "All Users",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating notification:", formData)
    setShowCreateDialog(false)
    setFormData({ title: "", message: "", type: "Info", recipients: "All Users" })
  }

  return (
    <div className="space-y-6">
      {/* Notification Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Notification Center</h3>
          <p className="text-sm text-gray-600">Manage system notifications and announcements</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>Send a notification to system users</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter notification title"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NOTIFICATION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(type)}
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients *</Label>
                  <Select
                    value={formData.recipients}
                    onValueChange={(value) => setFormData({ ...formData, recipients: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RECIPIENT_GROUPS.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter notification message"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            System Notifications
          </CardTitle>
          <CardDescription>All system notifications and announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_NOTIFICATIONS.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-mono text-sm">{notification.id}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium truncate">{notification.title}</div>
                        <div className="text-sm text-gray-500 truncate">{notification.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(notification.type)}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(notification.type)}
                          {notification.type}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{notification.recipients}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(notification.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>{notification.views}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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
