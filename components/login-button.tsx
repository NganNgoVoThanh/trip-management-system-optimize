"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function LoginButton({ size = "default" }: { size?: "default" | "lg" }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Kiểm tra email công ty
    if (!email.includes("@") || !email.endsWith(".com")) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Vui lòng sử dụng email công ty hợp lệ",
        variant: "destructive",
      })
      return
    }

    // Mô phỏng đăng nhập SSO
    toast({
      title: "Đăng nhập thành công",
      description: "Đang chuyển hướng đến bảng điều khiển...",
    })

    // Kiểm tra nếu là admin (demo)
    if (email.includes("admin")) {
      setTimeout(() => router.push("/admin/dashboard"), 1500)
    } else {
      setTimeout(() => router.push("/dashboard"), 1500)
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} className={size === "lg" ? "px-8" : ""}>
          Đăng nhập
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng nhập với SSO</DialogTitle>
          <DialogDescription>Sử dụng email công ty của bạn để đăng nhập vào hệ thống.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email công ty</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Tiếp tục với SSO
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
