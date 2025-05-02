"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, MapPin, Users, RefreshCw, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dữ liệu mẫu cho các đề xuất tối ưu
const mockOptimizationProposals = [
  {
    id: "opt-1",
    trips: [
      {
        id: "trip-1",
        user: "Nguyễn Văn A",
        departureLocation: "Văn phòng HCM",
        destination: "Nhà máy B",
        departureDate: "2025-05-05",
        departureTime: "08:00",
        originalDepartureTime: "09:00",
      },
      {
        id: "trip-2",
        user: "Trần Thị B",
        departureLocation: "Văn phòng HCM",
        destination: "Nhà máy B",
        departureDate: "2025-05-05",
        departureTime: "08:00",
        originalDepartureTime: "10:00",
      },
    ],
    vehicle: "Xe 4 chỗ",
    status: "pending",
    savingEstimate: "500.000 VNĐ",
  },
  {
    id: "opt-2",
    trips: [
      {
        id: "trip-3",
        user: "Lê Văn C",
        departureLocation: "Nhà máy A",
        destination: "Văn phòng Hà Nội",
        departureDate: "2025-05-10",
        departureTime: "07:30",
        originalDepartureTime: "08:30",
      },
      {
        id: "trip-4",
        user: "Phạm Thị D",
        departureLocation: "Nhà máy A",
        destination: "Văn phòng Hà Nội",
        departureDate: "2025-05-10",
        departureTime: "07:30",
        originalDepartureTime: "07:00",
      },
      {
        id: "trip-5",
        user: "Hoàng Văn E",
        departureLocation: "Nhà máy A",
        destination: "Văn phòng Hà Nội",
        departureDate: "2025-05-10",
        departureTime: "07:30",
        originalDepartureTime: "09:00",
      },
    ],
    vehicle: "Xe 7 chỗ",
    status: "pending",
    savingEstimate: "1.200.000 VNĐ",
  },
]

export function TripOptimization() {
  const { toast } = useToast()
  const [proposals, setProposals] = useState(mockOptimizationProposals)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleApproveProposal = (proposalId: string) => {
    setProposals(
      proposals.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "approved" } : proposal)),
    )
    toast({
      title: "Đề xuất đã được chấp nhận",
      description: "Thông báo sẽ được gửi đến người dùng",
    })
  }

  const handleRejectProposal = (proposalId: string) => {
    setProposals(
      proposals.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "rejected" } : proposal)),
    )
    toast({
      title: "Đề xuất đã bị từ chối",
      description: "Các chuyến đi sẽ giữ nguyên lịch trình ban đầu",
    })
  }

  const handleRunOptimization = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      toast({
        title: "Tối ưu hóa hoàn tất",
        description: "Các đề xuất mới đã được tạo",
      })
    }, 2000)
  }

  const handleSendNotifications = (proposalId: string) => {
    toast({
      title: "Thông báo đã được gửi",
      description: "Email đã được gửi đến tất cả người dùng liên quan",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tối Ưu Hóa Chuyến Đi</CardTitle>
          <CardDescription>Xem và quản lý các đề xuất tối ưu hóa chuyến đi</CardDescription>
        </div>
        <Button onClick={handleRunOptimization} disabled={isOptimizing}>
          {isOptimizing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Đang tối ưu...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Chạy tối ưu hóa
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {proposals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <RefreshCw className="mb-2 h-10 w-10 text-gray-400" />
            <h3 className="mb-1 text-lg font-medium">Không có đề xuất nào</h3>
            <p className="text-sm text-gray-500">Chạy tối ưu hóa để tạo các đề xuất mới</p>
          </div>
        ) : (
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="rounded-lg border p-4 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-lg font-medium">Đề xuất gộp {proposal.trips.length} chuyến đi</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Ngày: {formatDate(proposal.trips[0].departureDate)}</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>Giờ: {proposal.trips[0].departureTime}</span>
                      <Users className="ml-2 h-4 w-4" />
                      <span>{proposal.vehicle}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-green-600">
                      Tiết kiệm ước tính: {proposal.savingEstimate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {proposal.status === "pending" ? (
                      <>
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                          onClick={() => handleApproveProposal(proposal.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Chấp nhận
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleRejectProposal(proposal.id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Từ chối
                        </Button>
                      </>
                    ) : proposal.status === "approved" ? (
                      <>
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                          Đã chấp nhận
                        </Badge>
                        <Button variant="outline" onClick={() => handleSendNotifications(proposal.id)}>
                          Gửi thông báo
                        </Button>
                      </>
                    ) : (
                      <Badge className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        Đã từ chối
                      </Badge>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Chi tiết</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Chi tiết đề xuất tối ưu</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về đề xuất gộp chuyến</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                {proposal.trips[0].departureLocation} → {proposal.trips[0].destination}
                              </h4>
                              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Ngày: {formatDate(proposal.trips[0].departureDate)}</span>
                                <Clock className="ml-2 h-4 w-4" />
                                <span>Giờ đề xuất: {proposal.trips[0].departureTime}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-green-600">Tiết kiệm: {proposal.savingEstimate}</div>
                              <div className="text-sm text-gray-500">{proposal.vehicle}</div>
                            </div>
                          </div>

                          <div className="rounded-md border">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-muted/50">
                                  <th className="px-4 py-2 text-left font-medium">Người dùng</th>
                                  <th className="px-4 py-2 text-left font-medium">Giờ ban đầu</th>
                                  <th className="px-4 py-2 text-left font-medium">Giờ đề xuất</th>
                                  <th className="px-4 py-2 text-left font-medium">Thay đổi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {proposal.trips.map((trip) => (
                                  <tr key={trip.id} className="border-b">
                                    <td className="px-4 py-2">{trip.user}</td>
                                    <td className="px-4 py-2">{trip.originalDepartureTime}</td>
                                    <td className="px-4 py-2">{trip.departureTime}</td>
                                    <td className="px-4 py-2">
                                      {trip.originalDepartureTime === trip.departureTime ? (
                                        <span className="text-green-600">Không thay đổi</span>
                                      ) : (
                                        <span className="text-amber-600">
                                          {trip.originalDepartureTime > trip.departureTime ? "Sớm hơn" : "Muộn hơn"}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                            <h4 className="mb-2 font-medium text-blue-700 dark:text-blue-400">Phân tích AI</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                              Đề xuất này sẽ giúp tiết kiệm chi phí vận chuyển bằng cách gộp {proposal.trips.length}{" "}
                              chuyến đi có cùng điểm đi và điểm đến. Thời gian di chuyển trung bình sẽ thay đổi không
                              đáng kể (±30 phút) cho mỗi người dùng.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          {proposal.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => {
                                  handleRejectProposal(proposal.id)
                                  document
                                    .querySelector('[role="dialog"]')
                                    ?.closest('div[data-state="open"]')
                                    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                }}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Từ chối
                              </Button>
                              <Button
                                className="bg-green-600 text-white hover:bg-green-700"
                                onClick={() => {
                                  handleApproveProposal(proposal.id)
                                  document
                                    .querySelector('[role="dialog"]')
                                    ?.closest('div[data-state="open"]')
                                    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                }}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Chấp nhận và thông báo
                              </Button>
                            </>
                          )}
                          {proposal.status === "approved" && (
                            <Button
                              onClick={() => {
                                handleSendNotifications(proposal.id)
                                document
                                  .querySelector('[role="dialog"]')
                                  ?.closest('div[data-state="open"]')
                                  ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                              }}
                            >
                              Gửi thông báo
                            </Button>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-2">
                  {proposal.trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex flex-col justify-between rounded-md border p-3 md:flex-row md:items-center"
                    >
                      <div>
                        <div className="font-medium">{trip.user}</div>
                        <div className="flex flex-col gap-1 text-sm text-gray-500 md:flex-row md:gap-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Từ: {trip.departureLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Đến: {trip.destination}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Giờ ban đầu: {trip.originalDepartureTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400">
                          {trip.originalDepartureTime === trip.departureTime
                            ? "Không thay đổi"
                            : `Thay đổi: ${trip.originalDepartureTime} → ${trip.departureTime}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
