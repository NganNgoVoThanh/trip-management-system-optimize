import type { Metadata } from "next"
import { AdminHeader } from "@/components/admin/header"
import { AdminShell } from "@/components/admin/shell"
import { TripOptimization } from "@/components/admin/trip-optimization"
import { TripManagement } from "@/components/admin/trip-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Admin Dashboard | Quản Lý Chuyến Đi",
  description: "Quản lý và tối ưu hóa chuyến đi",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <AdminShell>
          <Tabs defaultValue="optimization" className="space-y-4">
            <TabsList>
              <TabsTrigger value="optimization">Tối Ưu Hóa Chuyến Đi</TabsTrigger>
              <TabsTrigger value="management">Quản Lý Chuyến Đi</TabsTrigger>
            </TabsList>
            <TabsContent value="optimization" className="space-y-4">
              <TripOptimization />
            </TabsContent>
            <TabsContent value="management" className="space-y-4">
              <TripManagement />
            </TabsContent>
          </Tabs>
        </AdminShell>
      </div>
    </div>
  )
}
