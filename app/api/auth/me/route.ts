import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/user"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json(null, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user) {
      return NextResponse.json(null, { status: 401 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
