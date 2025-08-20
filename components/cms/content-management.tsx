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
import { Plus, Edit, Eye, Trash2, FileText } from "lucide-react"

// Mock content data
const MOCK_CONTENT = [
  {
    id: "CNT001",
    title: "IT Policy Guidelines",
    type: "Policy",
    status: "Published",
    lastModified: "2024-01-15",
    author: "System Administrator",
    views: 245,
  },
  {
    id: "CNT002",
    title: "Equipment Request Procedure",
    type: "Procedure",
    status: "Draft",
    lastModified: "2024-01-20",
    author: "IT Manager",
    views: 89,
  },
  {
    id: "CNT003",
    title: "System Maintenance Notice",
    type: "Announcement",
    status: "Published",
    lastModified: "2024-01-18",
    author: "System Administrator",
    views: 156,
  },
]

const CONTENT_TYPES = ["Policy", "Procedure", "Announcement", "FAQ", "Guide"]
const CONTENT_STATUSES = ["Draft", "Published", "Archived"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800"
    case "Draft":
      return "bg-yellow-100 text-yellow-800"
    case "Archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ContentManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    content: "",
    status: "Draft",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating content:", formData)
    setShowCreateDialog(false)
    setFormData({ title: "", type: "", content: "", status: "Draft" })
  }

  return (
    <div className="space-y-6">
      {/* Content Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Content Management</h3>
          <p className="text-sm text-gray-600">Manage system content, policies, and announcements</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>Add new content to the system</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter content title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter content body"
                  rows={8}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Content</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Library
          </CardTitle>
          <CardDescription>All system content and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_CONTENT.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-mono text-sm">{content.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-sm text-gray-500">by {content.author}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{content.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(content.status)}>{content.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(content.lastModified).toLocaleDateString()}</TableCell>
                    <TableCell>{content.views}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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
