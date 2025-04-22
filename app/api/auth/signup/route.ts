import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/user"
import { login } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      provider: "local",
    })

    // Remove password from response
    const userObj = user.toObject()
    delete userObj.password

    // Create session
    const response = NextResponse.json({ id: user._id, name: user.name, email: user.email }, { status: 201 })

    await login(response, user._id.toString())

    return response
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 })
  }
}
