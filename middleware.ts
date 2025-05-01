    import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Update the session if needed
  const response = await updateSession(request)
  if (response) return response

  // Get the pathname
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/login" || path === "/signup" || path.startsWith("/api/auth/")

  // Check if the user is authenticated by looking for the auth token
  const isAuthenticated = request.cookies.has("auth-token")

  // Redirect authenticated users away from login/signup pages
  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && path.startsWith("/dashboard") && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
