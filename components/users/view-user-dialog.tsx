"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
} from "lucide-react";

export function ViewUserDialog({ isOpen, onClose, user }) {
  if (!user) return null;

  const getRoleBadge = (role) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge variant="destructive">
            <Shield className="h-3 w-3 mr-1" />
            Super Admin
          </Badge>
        );
      case "manager":
        return (
          <Badge variant="secondary">
            <User className="h-3 w-3 mr-1" />
            Manager IT
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            Complete information for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Full Name
                  </div>
                  <div className="text-base">{user.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Role</div>
                  <div className="mt-1">{getRoleBadge(user.role)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                  <div className="text-base">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                  <div className="text-base">
                    {user.phone || "Not provided"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  Department
                </div>
                <div className="text-base">{user.department}</div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Status
                  </div>
                  <Badge
                    variant={user.isActive ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Last Login
                  </div>
                  <div className="text-base">{user.lastLogin}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Account Created
                </div>
                <div className="text-base">{user.createdAt}</div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permissions</CardTitle>
              <CardDescription>Based on user role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.role === "super_admin" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        Full system administration
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">User management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">CMS management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Database management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">System settings</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Inventory management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Equipment issuance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Report generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-500">
                        User management (restricted)
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
