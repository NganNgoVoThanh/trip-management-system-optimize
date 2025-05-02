"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, MapPin, Mail, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dữ liệu mẫu cho các chuyến đi
const mockTrips = [
  {
    id: "trip-1",
    user: "Nguyễn Văn A",
    email: "nguyen.van.a@company.com",
    departureLocation: "Văn phòng HCM",
    destination: "Nhà máy B",
    departureDate: "2025-05-05",
    departureTime: "08:00",
    returnDate: "2025-05-07",
    returnTime: "17:00",
    status: "confirmed",
    notified: true,
    optimized: true,
    originalDepartureTime: "09:00",
  },
  {
    id: "trip-2",
    user: "Trần Thị B",
    email: "tran.thi.b@company.com",
    departureLocation: "Văn phòng HCM",
    destination: "Nhà máy B",
    departureDate: "2025-05-05",
    departureTime: "08:00",
    returnDate: "2025-05-07",
    returnTime: "17:00",
    status: "confirmed",
    notified: false,
    optimized: true,
    originalDepartureTime: "10:00",
  },
  {
    id: "trip-3",
    user: "Lê Văn C",
    email: "le.van.c@company.com",
    departureLocation: "Nhà máy A",
    destination: "Văn phòng Hà Nội",
    departureDate: "2025-05-10",
    departureTime: "07:30",
    returnDate: "2025-05-12",
    returnTime: "18:30",
    status: "pending",
    notified: false,
    optimized: false,
  },
]

export function TripManagement() {
  const { toast } = useToast()
  const [trips, setTrips] = useState(mockTrips)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleSendNotification = (tripId: string) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? { ...trip, notified: true } : trip)))
    toast({
      title: "Thông báo đã được gửi",
      description: "Email đã được gửi đến người dùng",
    })
  }

  const handleUpdateStatus = (tripId: string, newStatus: string) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? { ...trip, status: newStatus } : trip)))
    toast({
      title: "Trạng thái đã được cập nhật",
      description: `Chuyến đi đã được cập nhật thành ${newStatus === "confirmed" ? "đã xác nhận" : "đang xử lý"}`,
    })
  }

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.departureLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "confirmed" && trip.status === "confirmed") ||
      (statusFilter === "pending" && trip.status === "pending") ||
      (statusFilter === "optimized" && trip.optimized) ||
      (statusFilter === "not-notified" && !trip.notified)

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quản Lý Chuyến Đi</CardTitle>
        <CardDescription>Xem và quản lý tất cả các chuyến đi đã đăng ký</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm kiếm theo tên, địa điểm..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả chuyến đi</SelectItem>
              <SelectItem value="confirmed">Đã xác nhận</SelectItem>
              <SelectItem value="pending">Đang xử lý</SelectItem>
              <SelectItem value="optimized">Đã tối ưu</SelectItem>
              <SelectItem value="not-notified">Chưa thông báo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-2 h-10 w-10 text-gray-400" />
            <h3 className="mb-1 text-lg font-medium">Không tìm thấy chuyến đi nào</h3>
            <p className="text-sm text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="rounded-lg border p-4 shadow-sm transition-all hover:shadow">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{trip.user}</h3>
                      {trip.status === "confirmed" ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Đã xác nhận
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
                        >
                          Đang xử lý
                        </Badge>
                      )}
                      {trip.optimized && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          Đã tối ưu
                        </Badge>
                      )}
                      {!trip.notified && trip.optimized && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                        >
                          Chưa thông báo
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trip.departureLocation} → {trip.destination}
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-500 md:flex-row md:gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Đi: {formatDate(trip.departureDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{trip.departureTime}</span>
                      </div>
                    </div>
                    {trip.optimized && trip.originalDepartureTime && (
                      <div className="text-sm text-amber-600 dark:text-amber-400">
                        Giờ đi ban đầu: {trip.originalDepartureTime}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Chi tiết</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chi tiết chuyến đi</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về chuyến đi của {trip.user}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="mb-2 font-medium">Thông tin người dùng</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Tên:</span>
                                  <span>{trip.user}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Email:</span>
                                  <span>{trip.email}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 font-medium">Trạng thái</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Trạng thái:</span>
                                  <span>{trip.status === "confirmed" ? "Đã xác nhận" : "Đang xử lý"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Đã thông báo:</span>
                                  <span>{trip.notified ? "Có" : "Chưa"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Đã tối ưu:</span>
                                  <span>{trip.optimized ? "Có" : "Không"}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="mb-2 font-medium">Chi tiết chuyến đi</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>Từ: {trip.departureLocation}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>Đến: {trip.destination}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>Ngày đi: {formatDate(trip.departureDate)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>Giờ đi: {trip.departureTime}</span>
                                {trip.optimized && trip.originalDepartureTime && (
                                  <span className="text-amber-600">(Ban đầu: {trip.originalDepartureTime})</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>Ngày về: {formatDate(trip.returnDate)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>Giờ về: {trip.returnTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
                            {trip.status === "pending" && (
                              <Button
                                onClick={() => {
                                  handleUpdateStatus(trip.id, "confirmed")
                                  document
                                    .querySelector('[role="dialog"]')
                                    ?.closest('div[data-state="open"]')
                                    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                }}
                              >
                                Xác nhận chuyến đi
                              </Button>
                            )}
                            {trip.optimized && !trip.notified && (
                              <Button
                                onClick={() => {
                                  handleSendNotification(trip.id)
                                  document
                                    .querySelector('[role="dialog"]')
                                    ?.closest('div[data-state="open"]')
                                    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                }}
                              >
                                Gửi thông báo
                              </Button>
                            )}
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {trip.status === "pending" && (
                      <Button onClick={() => handleUpdateStatus(trip.id, "confirmed")}>Xác nhận</Button>
                    )}
                    {trip.optimized && !trip.notified && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => handleSendNotification(trip.id)}
                      >
                        <Mail className="h-4 w-4" />
                        Thông báo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
