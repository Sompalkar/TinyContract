"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Plus, Search, Filter, Download, Send, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

export default function ContractsPage() {
  const { toast } = useToast()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
            {
              _id: "5",
              title: "Software Development NDA",
              clientName: "Tech Innovations",
              status: "expired",
              createdAt: "2025-03-20T16:30:00Z",
              templateType: "nda",
            },
            {
              _id: "6",
              title: "UI/UX Design Contract",
              clientName: "Creative Solutions",
              status: "signed",
              createdAt: "2025-03-15T13:10:00Z",
              templateType: "freelance",
            },
          ]

          setContracts(mockContracts)
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

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDeleteContract = async (id: string) => {
    try {
      // In a real implementation, this would call the API
      // For the MVP, we'll simulate the deletion
      setContracts((prev) => prev.filter((contract) => contract._id !== id))

      toast({
        title: "Success",
        description: "Contract deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting contract:", error)
      toast({
        title: "Error",
        description: "Failed to delete contract. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSendReminder = async (id: string) => {
    toast({
      title: "Reminder Sent",
      description: "A reminder has been sent to the client",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
          <p className="text-muted-foreground">Manage all your contracts in one place</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Contract
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contracts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contracts</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium">Contract</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Client</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-[100px]" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-[80px]" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-[100px]" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-[80px]" />
                    </td>
                    <td className="p-4 text-right">
                      <Skeleton className="h-8 w-[100px] ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-24 text-center">
                    {searchQuery || statusFilter !== "all" ? (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-muted-foreground">No contracts match your filters</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("")
                            setStatusFilter("all")
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground mb-2">No contracts found</p>
                        <Link href="/dashboard/create">
                          <Button>Create your first contract</Button>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredContracts.map((contract) => (
                  <tr key={contract._id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <Link href={`/dashboard/contracts/${contract._id}`} className="font-medium hover:underline">
                          {contract.title}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4">{contract.clientName}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          contract.status === "signed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : contract.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : contract.status === "expired"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">{new Date(contract.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="capitalize">{contract.templateType}</span>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/contracts/${contract._id}`}>View Contract</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          {contract.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleSendReminder(contract._id)}>
                              <Send className="mr-2 h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteContract(contract._id)}
                          >
                            Delete Contract
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
