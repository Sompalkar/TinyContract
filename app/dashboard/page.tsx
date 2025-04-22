"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Plus, Clock, CheckCircle, AlertCircle, BarChart4, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

type Contract = {
  _id: string
  title: string
  clientName: string
  status: string
  createdAt: string
  templateType: string
}

export default function Dashboard() {
  const { toast } = useToast()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    signed: 0,
    expired: 0,
  })

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // In a real implementation, this would fetch from the API
        // For the MVP, we'll use mock data
        setTimeout(() => {
          const mockContracts = [
            {
              _id: "1",
              title: "Website Development NDA",
              clientName: "Acme Corp",
              status: "signed",
              createdAt: "2025-04-15T10:30:00Z",
              templateType: "nda",
            },
            {
              _id: "2",
              title: "Mobile App Development Agreement",
              clientName: "TechStart Inc",
              status: "pending",
              createdAt: "2025-04-10T14:20:00Z",
              templateType: "freelance",
            },
            {
              _id: "3",
              title: "Logo Design IP Transfer",
              clientName: "Brand Solutions",
              status: "draft",
              createdAt: "2025-04-05T09:15:00Z",
              templateType: "ip",
            },
            {
              _id: "4",
              title: "Content Writing Agreement",
              clientName: "Media Group",
              status: "pending",
              createdAt: "2025-04-02T11:45:00Z",
              templateType: "freelance",
            },
          ]

          setContracts(mockContracts)

          // Calculate stats
          setStats({
            total: mockContracts.length,
            pending: mockContracts.filter((c) => c.status === "pending").length,
            signed: mockContracts.filter((c) => c.status === "signed").length,
            expired: mockContracts.filter((c) => c.status === "expired").length,
          })

          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching contracts:", error)
        toast({
          title: "Error",
          description: "Failed to load contracts. Please refresh the page.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchContracts()
  }, [toast])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">Here's an overview of your contracts and recent activity</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Contract
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{stats.total}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{stats.pending}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signed Contracts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{stats.signed}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{stats.expired}</div>}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Contracts</TabsTrigger>
          <TabsTrigger value="pending">Pending Signatures</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contracts</CardTitle>
              <CardDescription>View and manage your recently created contracts</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : contracts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No contracts yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first contract to get started</p>
                  <Link href="/dashboard/create">
                    <Button>Create Contract</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div
                      key={contract._id}
                      className="flex items-center justify-between space-x-4 rounded-md border p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">{contract.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {contract.clientName} • {new Date(contract.createdAt).toLocaleDateString()}
                          </p>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                contract.status === "signed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : contract.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/dashboard/contracts/${contract._id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {contracts.length > 0 && (
              <CardFooter>
                <Link href="/dashboard/contracts">
                  <Button variant="outline">View All Contracts</Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Signatures</CardTitle>
              <CardDescription>Contracts that are waiting for signatures</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {contracts
                    .filter((contract) => contract.status === "pending")
                    .map((contract) => (
                      <div
                        key={contract._id}
                        className="flex items-center justify-between space-x-4 rounded-md border p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="rounded-full p-2 bg-yellow-100 dark:bg-yellow-900">
                            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none">{contract.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {contract.clientName} • {new Date(contract.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Send Reminder</Button>
                          <Link href={`/dashboard/contracts/${contract._id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  {contracts.filter((contract) => contract.status === "pending").length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No pending signatures</h3>
                      <p className="text-muted-foreground">All your contracts have been signed or are still in draft</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and contract updates</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Website Development NDA</span> was signed by{" "}
                        <span className="font-medium">Acme Corp</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        You created <span className="font-medium">Mobile App Development Agreement</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:20 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-yellow-100 dark:bg-yellow-900">
                      <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Content Writing Agreement</span> was sent to{" "}
                        <span className="font-medium">Media Group</span> for signature
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                      <BarChart4 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        AI risk assessment completed for <span className="font-medium">Logo Design IP Transfer</span>
                      </p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
