"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function TripRegistration() {
  const { toast } = useToast()
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [departureTime, setDepartureTime] = useState("")
  const [returnTime, setReturnTime] = useState("")
  const [departureLocation, setDepartureLocation] = useState("")
  const [destination, setDestination] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!departureDate || !returnDate || !departureTime || !returnTime || !departureLocation || !destination) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin chuyến đi",
        variant: "destructive",
      })
      return
    }

    // Mô phỏng đăng ký chuyến đi
    toast({
      title: "Đăng ký thành công",
      description: "Chuyến đi của bạn đã được đăng ký và đang chờ xử lý",
    })

    // Reset form
    setDepartureDate(undefined)
    setReturnDate(undefined)
    setDepartureTime("")
    setReturnTime("")
    setDepartureLocation("")
    setDestination("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng Ký Chuyến Đi</CardTitle>
        <CardDescription>Đăng ký thông tin chuyến đi và về của bạn</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="departureLocation">Địa điểm xuất phát</Label>
              <Select value={departureLocation} onValueChange={setDepartureLocation}>
                <SelectTrigger id="departureLocation">
                  <SelectValue placeholder="Chọn địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="factory-a">Nhà máy A</SelectItem>
                  <SelectItem value="factory-b">Nhà máy B</SelectItem>
                  <SelectItem value="factory-c">Nhà máy C</SelectItem>
                  <SelectItem value="office-hcm">Văn phòng HCM</SelectItem>
                  <SelectItem value="office-hn">Văn phòng Hà Nội</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Địa điểm đến</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Chọn địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="factory-a">Nhà máy A</SelectItem>
                  <SelectItem value="factory-b">Nhà máy B</SelectItem>
                  <SelectItem value="factory-c">Nhà máy C</SelectItem>
                  <SelectItem value="office-hcm">Văn phòng HCM</SelectItem>
                  <SelectItem value="office-hn">Văn phòng Hà Nội</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Ngày đi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureTime">Giờ đi</Label>
              <Input
                id="departureTime"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Ngày về</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnTime">Giờ về</Label>
              <Input id="returnTime" type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
            <Input id="notes" placeholder="Thông tin thêm về chuyến đi của bạn" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Đăng Ký Chuyến Đi
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
