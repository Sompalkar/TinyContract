import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const { templateType, formData } = data

    // Create a prompt based on the template type and form data
    let prompt = `Generate a professional ${getTemplateName(templateType)} in markdown format with the following details:\n\n`

    // Add common fields
    prompt += `- Project Name: ${formData.projectName}\n`
    prompt += `- Client Name: ${formData.clientName}\n`
    prompt += `- Your Name: ${formData.yourName}\n`
    prompt += `- Company Name: ${formData.companyName || "Not specified"}\n`
    prompt += `- Project Description: ${formData.projectDescription}\n`

    // Add template-specific fields
    if (templateType === "freelance") {
      prompt += `- Start Date: ${formData.startDate || "Not specified"}\n`
      prompt += `- End Date: ${formData.endDate || "Not specified"}\n`
      prompt += `- Payment Amount: ${formData.amount || "Not specified"} ${formData.currency}\n`
    } else if (templateType === "ip") {
      prompt += `- Payment Amount: ${formData.amount || "Not specified"} ${formData.currency}\n`
    }

    prompt += `\nThe contract should be legally sound and follow standard practices for ${getTemplateName(templateType)} agreements in India.`

    // System prompt to guide the AI
    const system = `You are a legal contract generator specializing in creating professional, legally-sound contracts. 
    Format the contract in clean markdown with proper sections, clauses, and signature blocks. 
    Include all necessary legal clauses for the specific contract type.
    For Indian contracts, ensure compliance with Indian contract law.
    Include dispute resolution clauses and governing law sections.`

    // Generate the contract using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system,
    })

    // Perform risk assessment
    const riskAssessment = await assessContractRisks(text, templateType)

    return NextResponse.json({
      contract: text,
      riskAssessment,
    })
  } catch (error) {
    console.error("Error generating contract:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getTemplateName(templateType: string): string {
  switch (templateType) {
    case "nda":
      return "Non-Disclosure Agreement (NDA)"
    case "freelance":
      return "Freelance Agreement"
    case "ip":
      return "Intellectual Property Transfer Agreement"
    default:
      return "Contract"
  }
}

async function assessContractRisks(contractText: string, templateType: string) {
  try {
    // In a real implementation, this would use AI to assess risks
    // For the MVP, we'll return mock data

    const riskPrompt = `Analyze the following ${getTemplateName(templateType)} for potential legal risks and issues:
    
    ${contractText}
    
    Provide a risk assessment with:
    1. A risk score from 0-100 (higher is better)
    2. A list of potential issues
    3. Recommendations for improvement`

    // In a real implementation, we would use AI here
    // const { text } = await generateText({
    //   model: openai("gpt-4o"),
    //   prompt: riskPrompt,
    //   system: "You are a legal risk assessment expert. Analyze contracts for potential issues and provide recommendations.",
    // })

    // For the MVP, return mock data
    return {
      score: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
      issues: ["Payment terms could be more specific", "Intellectual property clause needs strengthening"],
      recommendations: [
        "Add specific payment milestones",
        "Clarify IP ownership transfer timing",
        "Include confidentiality provisions",
      ],
    }
  } catch (error) {
    console.error("Error assessing contract risks:", error)
    return {
      score: 80,
      issues: ["Unable to perform detailed risk assessment"],
      recommendations: ["Review contract manually with a legal professional"],
    }
  }
}
