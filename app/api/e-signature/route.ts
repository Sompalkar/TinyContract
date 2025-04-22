import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import connectDB from "@/lib/db"
import Contract from "@/models/contract"

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { contractId, provider } = await req.json()

    // Find the contract
    const contract = await Contract.findOne({
      _id: contractId,
      userId: session.userId,
    })

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    // In a real implementation, this would integrate with the e-signature provider
    // For the MVP, we'll simulate the integration

    let signatureUrl

    if (provider === "docusign") {
      // Simulate DocuSign integration
      signatureUrl = "https://docusign.com/sign/123456789"
    } else if (provider === "adobe") {
      // Simulate Adobe Sign integration
      signatureUrl = "https://adobe.com/sign/123456789"
    } else {
      // Simulate email link
      signatureUrl = `https://example.com/sign/${contractId}`
    }

    // Update contract status
    contract.status = "pending"
    contract.sentAt = new Date()
    await contract.save()

    return NextResponse.json({
      success: true,
      signatureUrl,
      message: `Contract sent for signature via ${provider}`,
    })
  } catch (error) {
    console.error("Error sending for signature:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
