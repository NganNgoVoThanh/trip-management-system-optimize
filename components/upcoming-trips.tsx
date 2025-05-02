"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Calendar, Clock, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dữ liệu mẫu cho chuyến đi sắp tới
const mockUpcomingTrips = [
  {
    id: "trip-1",
    departureLocation: "Văn phòng HCM",
    destination: "Nhà máy B",
    departureDate: "2025-05-05",
    departureTime: "08:00",
    returnDate: "2025-05-07",
    returnTime: "17:00",
    status: "confirmed",
    optimized: true,
    originalDepartureTime: "09:00",
  },
  {
    id: "trip-2",
    departureLocation: "Nhà máy A",
    destination: "Văn phòng Hà Nội",
    departureDate: "2025-05-10",
    departureTime: "07:30",
    returnDate: "2025-05-12",
    returnTime: "18:30",
    status: "pending",
    optimized: false,
  },
]

export function UpcomingTrips() {
  const { toast } = useToast()
  const [trips, setTrips] = useState(mockUpcomingTrips)

  const handleCancelTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId))
    toast({
      title: "Hủy chuyến thành công",
      description: "Chuyến đi của bạn đã được hủy",
    })
  }

  const getLocationName = (code: string) => {
    const locations: Record<string, string> = {
      "factory-a": "Nhà máy A",
      "factory-b": "Nhà máy B",
      "factory-c": "Nhà máy C",
      "office-hcm": "Văn phòng HCM",
      "office-hn": "Văn phòng Hà Nội",
    }
    return locations[code] || code
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chuyến Đi Sắp Tới</CardTitle>
        <CardDescription>Quản lý các chuyến đi đã đăng ký của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-2 h-10 w-10 text-gray-400" />
            <h3 className="mb-1 text-lg font-medium">Không có chuyến đi nào</h3>
            <p className="text-sm text-gray-500">Bạn chưa có chuyến đi nào được đăng ký</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="rounded-lg border p-4 shadow-sm transition-all hover:shadow">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {trip.departureLocation} → {trip.destination}
                      </h3>
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
                    <div className="flex flex-col gap-1 text-sm text-gray-500 md:flex-row md:gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Về: {formatDate(trip.returnDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{trip.returnTime}</span>
                      </div>
                    </div>
                    {trip.optimized && trip.originalDepartureTime && (
                      <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>Lịch trình đã được điều chỉnh (Giờ đi ban đầu: {trip.originalDepartureTime})</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Chi tiết</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chi tiết chuyến đi</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về chuyến đi</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="mb-2 font-medium">Chuyến đi</h4>
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
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 font-medium">Chuyến về</h4>
                              <div className="space-y-2 text-sm">
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
                          {trip.optimized && (
                            <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                              <h4 className="mb-2 font-medium text-blue-700 dark:text-blue-400">Thông tin tối ưu</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-400">
                                Chuyến đi của bạn đã được tối ưu hóa để kết hợp với các chuyến đi khác.
                                {trip.originalDepartureTime && (
                                  <span className="block mt-1">
                                    Giờ đi ban đầu: {trip.originalDepartureTime} → Giờ đi mới: {trip.departureTime}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" onClick={() => handleCancelTrip(trip.id)}>
                      Hủy
                    </Button>
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
