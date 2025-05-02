import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TripRegistration } from "@/components/trip-registration"
import { UpcomingTrips } from "@/components/upcoming-trips"
import { AvailableTrips } from "@/components/available-trips"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Bảng Điều Khiển | Quản Lý Chuyến Đi",
  description: "Quản lý chuyến đi của bạn",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardShell>
          <Tabs defaultValue="register" className="space-y-4">
            <TabsList>
              <TabsTrigger value="register">Đăng Ký Chuyến Đi</TabsTrigger>
              <TabsTrigger value="upcoming">Chuyến Đi Sắp Tới</TabsTrigger>
              <TabsTrigger value="available">Chuyến Đi Khả Dụng</TabsTrigger>
            </TabsList>
            <TabsContent value="register" className="space-y-4">
              <TripRegistration />
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              <UpcomingTrips />
            </TabsContent>
            <TabsContent value="available" className="space-y-4">
              <AvailableTrips />
            </TabsContent>
          </Tabs>
        </DashboardShell>
      </div>
    </div>
  )
}
