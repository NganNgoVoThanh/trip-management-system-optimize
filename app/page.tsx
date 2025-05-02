import { LoginButton } from "@/components/login-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-xl">Quản Lý Chuyến Đi</span>
          </div>
          <nav className="flex items-center gap-4">
            <LoginButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tối ưu hóa chuyến đi doanh nghiệp
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hệ thống quản lý chuyến đi thông minh giúp tối ưu chi phí bằng cách gộp các chuyến đi có lịch trình
                  tương tự giữa các nhà máy.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <LoginButton size="lg" />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <h3 className="text-xl font-bold">Đăng ký chuyến đi</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Đăng ký thời gian và địa điểm cho chuyến đi và về của bạn.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <h3 className="text-xl font-bold">Tối ưu hóa bằng AI</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Hệ thống AI sẽ tự động gợi ý cách gộp các chuyến đi để tiết kiệm chi phí.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <h3 className="text-xl font-bold">Quản lý hiệu quả</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Admin có thể dễ dàng quản lý, điều chỉnh và thông báo cho người dùng về lịch trình.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Hệ Thống Quản Lý Chuyến Đi
          </p>
        </div>
      </footer>
    </div>
  )
}
