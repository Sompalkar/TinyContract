import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Contract from "@/models/contract"
import { getSession } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const contract = await Contract.findOne({
      _id: params.id,
      userId: session.userId,
    })

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error("Error fetching contract:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const data = await req.json()

    const contract = await Contract.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.userId,
      },
      { $set: data },
      { new: true },
    )

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error("Error updating contract:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const contract = await Contract.findOneAndDelete({
      _id: params.id,
      userId: session.userId,
    })

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contract:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
