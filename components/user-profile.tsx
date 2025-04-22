"use client"

import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div>
          <p className="text-sm font-medium">Not logged in</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {user.picture ? (
        <img src={user.picture || "/placeholder.svg"} alt={user.name} className="h-9 w-9 rounded-full" />
      ) : (
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {user.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  )
}
