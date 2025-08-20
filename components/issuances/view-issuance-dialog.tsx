"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { FileText, Calendar, User, Package, Clock } from "lucide-react"

interface ViewIssuanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  issuance: any
}

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

export function ViewIssuanceDialog({ open, onOpenChange, issuance }: ViewIssuanceDialogProps) {
  if (!issuance) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Issuance Details
          </DialogTitle>
          <DialogDescription>Complete information about issuance {issuance.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Equipment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Issuance ID</label>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{issuance.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Item Name</label>
                <p className="text-sm font-medium">{issuance.itemName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Serial Number</label>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{issuance.serialNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge className={getStatusColor(issuance.status)}>{issuance.status}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Employee Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Employee Name</label>
                <p className="text-sm font-medium">{issuance.employeeName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Employee ID</label>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{issuance.employeeId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-sm">{issuance.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Designation</label>
                <p className="text-sm">{issuance.designation}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Issuance Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Issued Date
                </label>
                <p className="text-sm">{new Date(issuance.issuedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Expected Return
                </label>
                <p className="text-sm">{new Date(issuance.expectedReturnDate).toLocaleDateString()}</p>
              </div>
              {issuance.actualReturnDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Actual Return
                  </label>
                  <p className="text-sm">{new Date(issuance.actualReturnDate).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Issued By</label>
                <p className="text-sm">{issuance.issuedBy}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Purpose</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{issuance.purpose}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Condition at Issuance</label>
                <p className="text-sm">{issuance.condition}</p>
              </div>
              {issuance.remarks && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Remarks</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">{issuance.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
