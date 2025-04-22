import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Contract from "@/models/contract"
import { getSession } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build query
    const query: any = { userId: session.userId }
    if (status) {
      query.status = status
    }

    const contracts = await Contract.find(query).sort({ createdAt: -1 }).limit(limit)

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const data = await req.json()

    // Create new contract
    const contract = await Contract.create({
      userId: session.userId,
      title: data.title,
      templateType: data.templateType,
      content: data.content,
      clientName: data.clientName,
      clientEmail: data.clientEmail || "",
      status: "draft",
      projectDetails: {
        name: data.projectName,
        description: data.projectDescription,
        startDate: data.startDate,
        endDate: data.endDate,
        amount: data.amount,
        currency: data.currency,
      },
      metadata: data.metadata || {},
    })

    return NextResponse.json({ contract }, { status: 201 })
  } catch (error) {
    console.error("Error creating contract:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
