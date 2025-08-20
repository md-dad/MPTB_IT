"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Eye, Calendar, MapPin, DollarSign, Package, Shield } from "lucide-react"

interface ViewItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
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

export function ViewItemDialog({ open, onOpenChange, item }: ViewItemDialogProps) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Item Details
          </DialogTitle>
          <DialogDescription>Complete information about {item.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Item ID</label>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{item.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-sm">{item.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Brand</label>
                <p className="text-sm font-medium">{item.brand}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Model</label>
                <p className="text-sm">{item.model}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Serial Number</label>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{item.serialNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <p className="text-sm">{item.location}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial & Warranty */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial & Warranty
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Purchase Price</label>
                <p className="text-sm font-medium">₹{item.price?.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Purchase Date
                </label>
                <p className="text-sm">{new Date(item.purchaseDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Warranty Expiry
                </label>
                <p className="text-sm">{new Date(item.warrantyExpiry).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {item.specifications && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{item.specifications}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
