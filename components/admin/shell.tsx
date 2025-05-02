import type React from "react"
interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">{children}</div>
    </div>
  )
}
