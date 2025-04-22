import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/user"
import { login } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    // Find user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create session
    const response = NextResponse.json({ id: user._id, name: user.name, email: user.email, picture: user.picture })

    await login(response, user._id.toString())

    return response
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 })
  }
}
