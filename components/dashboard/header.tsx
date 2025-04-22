"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Bell, FileText, Home, PlusCircle, Settings, User, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              <FileText className="h-5 w-5 text-primary" />
              <span>LegalAI</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Link href="/dashboard" passHref onClick={() => setOpen(false)}>
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted")}>
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/contracts" passHref onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname.includes("/dashboard/contracts") && "bg-muted")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Contracts
              </Button>
            </Link>
            <Link href="/dashboard/create" passHref onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/create" && "bg-muted")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
            </Link>
            <Link href="/dashboard/profile" passHref onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/profile" && "bg-muted")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/dashboard/settings" passHref onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/settings" && "bg-muted")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                setOpen(false)
                logout()
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          {pathname === "/dashboard"
            ? "Dashboard"
            : pathname === "/dashboard/create"
              ? "Create Contract"
              : pathname === "/dashboard/contracts"
                ? "Contracts"
                : pathname === "/dashboard/profile"
                  ? "Profile"
                  : pathname === "/dashboard/settings"
                    ? "Settings"
                    : "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
