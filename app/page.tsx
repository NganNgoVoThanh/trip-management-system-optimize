import { LoginButton } from "@/components/login-button"
import { Car, TrendingDown, Users, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl">Trips Management System</span>
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
                  Optimize Business Travel Costs
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Smart trip management system that reduces transportation costs by intelligently 
                  combining similar trips between Intersnack facilities.
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
                    <h3 className="text-xl font-bold">Register Your Trip</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Submit your business trip details including departure and return schedules.
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <h3 className="text-xl font-bold">AI Optimization</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our system automatically identifies opportunities to combine trips for cost savings.
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <h3 className="text-xl font-bold">Save Costs</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Reduce transportation expenses by up to 40% through intelligent trip combining.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <TrendingDown className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold mb-2">Cost Reduction</h3>
                <p className="text-sm text-gray-500">
                  Save up to 40% on transportation costs
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold mb-2">Smart Grouping</h3>
                <p className="text-sm text-gray-500">
                  Intelligently combine trips with similar routes
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold mb-2">Real-time Updates</h3>
                <p className="text-sm text-gray-500">
                  Instant notifications about schedule changes
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Car className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold mb-2">Vehicle Optimization</h3>
                <p className="text-sm text-gray-500">
                  Select the right vehicle size for each group
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Locations Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="font-bold mb-2">Ho Chi Minh Office</h3>
                <p className="text-sm text-gray-500">
                  76 Le Lai Street, Ben Thanh Ward, District 1, HCMC
                </p>
              </div>
              
              <div className="rounded-lg border p-6">
                <h3 className="font-bold mb-2">Phan Thiet Factory</h3>
                <p className="text-sm text-gray-500">
                  Phan Thiet Industrial Zone Phase 1, Binh Thuan Province
                </p>
              </div>
              
              <div className="rounded-lg border p-6">
                <h3 className="font-bold mb-2">Long An Factory</h3>
                <p className="text-sm text-gray-500">
                  Loi Binh Nhon Industrial Cluster, Tan An City, Long An Province
                </p>
              </div>
              
              <div className="rounded-lg border p-6">
                <h3 className="font-bold mb-2">Tay Ninh Factory</h3>
                <p className="text-sm text-gray-500">
                  Kinh Te Hamlet, Binh Minh Commune, Tay Ninh City
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-gray-500">
            © Intersnack Cashew Vietnam. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            For support, contact: ngan.ngo@intersnack.com.vn
          </p>
        </div>
      </footer>
    </div>
  )
}