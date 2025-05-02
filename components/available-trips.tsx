"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Dữ liệu mẫu cho các chuyến đi khả dụng
const mockAvailableTrips = [
  {
    id: "avail-1",
    departureLocation: "Văn phòng HCM",
    destination: "Nhà máy B",
    departureDate: "2025-05-05",
    departureTime: "08:00",
    returnDate: "2025-05-07",
    returnTime: "17:00",
    availableSeats: 2,
    totalSeats: 4,
  },
  {
    id: "avail-2",
    departureLocation: "Nhà máy A",
    destination: "Văn phòng Hà Nội",
    departureDate: "2025-05-10",
    departureTime: "07:30",
    returnDate: "2025-05-12",
    returnTime: "18:30",
    availableSeats: 3,
    totalSeats: 7,
  },
  {
    id: "avail-3",
    departureLocation: "Văn phòng Hà Nội",
    destination: "Nhà máy C",
    departureDate: "2025-05-15",
    departureTime: "09:00",
    returnDate: "2025-05-16",
    returnTime: "16:00",
    availableSeats: 1,
    totalSeats: 4,
  },
]

export function AvailableTrips() {
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleJoinTrip = (tripId: string) => {
    toast({
      title: "Đăng ký thành công",
      description: "Bạn đã đăng ký tham gia chuyến đi này",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chuyến Đi Khả Dụng</CardTitle>
        <CardDescription>Các chuyến đi hiện có mà bạn có thể tham gia</CardDescription>
      </CardHeader>
      <CardContent>
        {mockAvailableTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-2 h-10 w-10 text-gray-400" />
            <h3 className="mb-1 text-lg font-medium">Không có chuyến đi nào</h3>
            <p className="text-sm text-gray-500">Hiện không có chuyến đi nào khả dụng</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockAvailableTrips.map((trip) => (
              <div key={trip.id} className="rounded-lg border p-4 shadow-sm transition-all hover:shadow">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {trip.departureLocation} → {trip.destination}
                      </h3>
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                        Còn chỗ
                      </Badge>
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
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>
                        Chỗ trống: {trip.availableSeats}/{trip.totalSeats}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => handleJoinTrip(trip.id)}>Tham gia</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
