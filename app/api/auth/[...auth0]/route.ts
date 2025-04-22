import { handleAuth, handleLogin, handleCallback, handleLogout } from "@/lib/auth0"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { auth0: string[] } }) {
  const auth0Path = params.auth0[0]

  try {
    if (auth0Path === "login") {
      return handleLogin(request, {
        returnTo: "/dashboard",
      })
    }

    if (auth0Path === "callback") {
      return handleCallback(request)
    }

    if (auth0Path === "logout") {
      return handleLogout(request, {
        returnTo: "/",
      })
    }

    // Handle other auth routes
    return handleAuth(request, {
      ...params,
    })
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
