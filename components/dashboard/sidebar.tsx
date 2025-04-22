"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, PlusCircle, Settings, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [contractsOpen, setContractsOpen] = useState(true)

  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-card h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          <span>LegalAI</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Collapsible open={contractsOpen} onOpenChange={setContractsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn("w-full justify-between group", pathname.includes("/dashboard/contracts") && "bg-muted")}
              >
                <span className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Contracts
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", contractsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-1">
              <div className="grid gap-1">
                <Link href="/dashboard/contracts" passHref>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === "/dashboard/contracts" && "bg-muted")}
                    size="sm"
                  >
                    All Contracts
                  </Button>
                </Link>
                <Link href="/dashboard/contracts/pending" passHref>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === "/dashboard/contracts/pending" && "bg-muted")}
                    size="sm"
                  >
                    Pending Signatures
                  </Button>
                </Link>
                <Link href="/dashboard/contracts/signed" passHref>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === "/dashboard/contracts/signed" && "bg-muted")}
                    size="sm"
                  >
                    Signed Contracts
                  </Button>
                </Link>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Link href="/dashboard/create" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/create" && "bg-muted")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Contract
            </Button>
          </Link>

          <Link href="/dashboard/profile" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/profile" && "bg-muted")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Link href="/dashboard/settings" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/settings" && "bg-muted")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>

      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
