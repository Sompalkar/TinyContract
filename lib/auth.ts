import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function encrypt(payload: any) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secretKey)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(response: NextResponse, userId: string) {
  const token = await encrypt({ userId })
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
  return response
}

export async function logout() {
  cookies().set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  })
}

export async function getSession() {
  const token = cookies().get("auth-token")?.value
  if (!token) return null
  return await decrypt(token)
}

export async function updateSession(request: NextRequest) {
  const session = await getSession()
  if (!session) return null

  // Refresh the session so it doesn't expire
  const response = NextResponse.next()
  await login(response, session.userId as string)
  return response
}
