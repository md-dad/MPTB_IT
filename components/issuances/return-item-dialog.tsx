"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ReturnItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  issuance: any
}

export function ReturnItemDialog({ open, onOpenChange, issuance }: ReturnItemDialogProps) {
  const [formData, setFormData] = useState({
    returnDate: new Date(),
    returnCondition: "Good",
    returnRemarks: "",
    damageDescription: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the database
    console.log("Processing return:", formData)
    onOpenChange(false)
  }

  if (!issuance) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Return Equipment
          </DialogTitle>
          <DialogDescription>
            Process the return of {issuance.itemName} from {issuance.employeeName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issuance Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Issuance Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Item:</span>
                <p className="font-medium">{issuance.itemName}</p>
              </div>
              <div>
                <span className="text-gray-500">Serial Number:</span>
                <p className="font-mono">{issuance.serialNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">Employee:</span>
                <p className="font-medium">{issuance.employeeName}</p>
              </div>
              <div>
                <span className="text-gray-500">Issued Date:</span>
                <p>{new Date(issuance.issuedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Return Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Return Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.returnDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.returnDate}
                    onSelect={(date) => date && setFormData({ ...formData, returnDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnCondition">Return Condition *</Label>
              <Select
                value={formData.returnCondition}
                onValueChange={(value) => setFormData({ ...formData, returnCondition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                  <SelectItem value="Damaged">Damaged</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.returnCondition === "Damaged" || formData.returnCondition === "Poor") && (
            <div className="space-y-2">
              <Label htmlFor="damageDescription">Damage Description *</Label>
              <Textarea
                id="damageDescription"
                value={formData.damageDescription}
                onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
                placeholder="Describe the damage or issues with the equipment"
                rows={3}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="returnRemarks">Return Remarks</Label>
            <Textarea
              id="returnRemarks"
              value={formData.returnRemarks}
              onChange={(e) => setFormData({ ...formData, returnRemarks: e.target.value })}
              placeholder="Any additional notes about the return"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Process Return</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
