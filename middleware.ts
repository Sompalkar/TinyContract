    import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Update the session if needed
  const response = await updateSession(request)
  if (response) return response

  // Get the pathname
  const path = request.nextUrl.pathname
 
