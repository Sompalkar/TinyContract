"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Send, CheckCircle, Shield, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function CreateContract() {
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [templateType, setTemplateType] = useState("nda")
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    clientEmail: "",
    yourName: "",
    companyName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    amount: "",
    currency: "INR",
  })
  const [generatedContract, setGeneratedContract] = useState("")
  const [riskAssessment, setRiskAssessment] = useState({
    score: 85,
    issues: ["Payment terms could be more specific", "Intellectual property clause needs strengthening"],
    recommendations: [
      "Add specific payment milestones",
      "Clarify IP ownership transfer timing",
      "Include confidentiality provisions",
    ],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateChange = (value: string) => {
    setTemplateType(value)
  }

  const handleGenerateContract = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would call the AI API
      // For the MVP, we'll simulate the AI generation with a timeout
      setTimeout(() => {
        let contractTemplate = ""

        if (templateType === "nda") {
          contractTemplate = generateNDATemplate()
        } else if (templateType === "freelance") {
          contractTemplate = generateFreelanceTemplate()
        } else if (templateType === "ip") {
          contractTemplate = generateIPTemplate()
        }

        setGeneratedContract(contractTemplate)
        setLoading(false)
        setStep(3)
      }, 2000)
    } catch (error) {
      console.error("Error generating contract:", error)
      toast({
        title: "Error",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const generateNDATemplate = () => {
    return `
# NON-DISCLOSURE AGREEMENT

THIS AGREEMENT is made on ${new Date().toLocaleDateString()} between:

**${formData.yourName}** of **${formData.companyName}** (the "Disclosing Party")

and

**${formData.clientName}** (the "Receiving Party")

## 1. PURPOSE

The parties wish to explore a business opportunity related to **${formData.projectName}** (the "Purpose").

## 2. CONFIDENTIAL INFORMATION

"Confidential Information" means all information disclosed by the Disclosing Party to the Receiving Party for the Purpose, regardless of whether it is marked as confidential.

## 3. OBLIGATIONS

The Receiving Party agrees to:
- Keep the Confidential Information secret
- Use the Confidential Information only for the Purpose
- Not disclose the Confidential Information to any third party without prior written consent
- Take reasonable measures to protect the Confidential Information

## 4. TERM

This Agreement shall remain in effect for 2 years from the date of signing.

## 5. GOVERNING LAW

This Agreement shall be governed by the laws of India.

## 6. DISPUTE RESOLUTION

Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India.

## 7. ENTIRE AGREEMENT

This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof.

SIGNED:

________________________
${formData.yourName}
${formData.companyName}

________________________
${formData.clientName}
  `
  }

  const generateFreelanceTemplate = () => {
    return `
# FREELANCE AGREEMENT

THIS AGREEMENT is made on ${new Date().toLocaleDateString()} between:

**${formData.clientName}** (the "Client")

and

**${formData.yourName}** of **${formData.companyName}** (the "Freelancer")

## 1. SERVICES

The Freelancer agrees to provide the following services to the Client:

**${formData.projectDescription}**

## 2. TERM

This Agreement shall commence on ${formData.startDate || new Date().toLocaleDateString()} and continue until ${formData.endDate || "project completion"}.

## 3. COMPENSATION

The Client agrees to pay the Freelancer ${formData.amount || "an agreed amount"} ${formData.currency} for the services provided.

Payment shall be made as follows:
- 50% upon signing this Agreement
- 50% upon completion of the Services

## 4. INTELLECTUAL PROPERTY

All intellectual property created by the Freelancer in the course of providing the services shall be owned by the Client upon full payment.

## 5. CONFIDENTIALITY

The Freelancer agrees to keep all Client information confidential.

## 6. TERMINATION

Either party may terminate this Agreement with 14 days written notice.

## 7. GOVERNING LAW

This Agreement shall be governed by the laws of India.

## 8. DISPUTE RESOLUTION

Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India.

SIGNED:

________________________
${formData.clientName}
Client

________________________
${formData.yourName}
Freelancer
  `
  }

  const generateIPTemplate = () => {
    return `
# INTELLECTUAL PROPERTY TRANSFER AGREEMENT

THIS AGREEMENT is made on ${new Date().toLocaleDateString()} between:

**${formData.yourName}** of **${formData.companyName}** (the "Assignor")

and

**${formData.clientName}** (the "Assignee")

## 1. ASSIGNMENT

The Assignor hereby assigns to the Assignee all right, title, and interest in and to the intellectual property related to:

**${formData.projectName}: ${formData.projectDescription}**

## 2. INTELLECTUAL PROPERTY

The intellectual property being transferred includes:
- All copyrights and copyright applications
- All patents and patent applications
- All trademarks and trademark applications
- All trade secrets
- All other intellectual property rights

## 3. CONSIDERATION

In consideration for this assignment, the Assignee shall pay the Assignor ${formData.amount || "an agreed amount"} ${formData.currency}.

## 4. WARRANTIES

The Assignor warrants that:
- They are the sole owner of the intellectual property
- The intellectual property does not infringe on the rights of any third party
- They have the right to assign the intellectual property

## 5. GOVERNING LAW

This Agreement shall be governed by the laws of India.

## 6. DISPUTE RESOLUTION

Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India.

SIGNED:

________________________
${formData.yourName}
Assignor

________________________
${formData.clientName}
Assignee
  `
  }

  const handleSendForSignature = () => {
    setLoading(true)

    // In a real implementation, this would integrate with e-signature APIs
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Success",
        description: "Contract sent for signature!",
      })
      router.push("/dashboard/contracts")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Contract</h1>
      </div>

      {/* Step Indicator */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8 max-w-md">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className="text-sm mt-2">Select Template</span>
          </div>
          <div className="flex-1 h-1 bg-muted mx-2">
            <div className={`h-full bg-primary ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="text-sm mt-2">Enter Details</span>
          </div>
          <div className="flex-1 h-1 bg-muted mx-2">
            <div className={`h-full bg-primary ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-sm mt-2">Review & Sign</span>
          </div>
        </div>
      </div>

      {/* Step 1: Select Template */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Contract Template</CardTitle>
            <CardDescription>Choose the type of contract you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nda" onValueChange={handleTemplateChange}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="nda">NDA</TabsTrigger>
                <TabsTrigger value="freelance">Freelance Agreement</TabsTrigger>
                <TabsTrigger value="ip">IP Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value="nda">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Non-Disclosure Agreement</h3>
                      <p className="text-sm text-muted-foreground">
                        Protect your confidential information when sharing it with clients, partners, or employees.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Includes:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Definition of confidential information
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Obligations of receiving party
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Term and termination clauses
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        India-specific legal compliance
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="freelance">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Freelance Agreement</h3>
                      <p className="text-sm text-muted-foreground">
                        Define the scope, deliverables, and payment terms for your freelance projects.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Includes:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Scope of work and deliverables
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Payment terms and schedule
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Intellectual property rights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Termination clauses
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ip">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">IP Transfer Agreement</h3>
                      <p className="text-sm text-muted-foreground">
                        Transfer intellectual property rights from one party to another.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Includes:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Complete IP rights transfer
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Consideration and payment terms
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Warranties and representations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        India-specific legal compliance
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => setStep(2)}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Enter Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Enter Contract Details</CardTitle>
            <CardDescription>
              Provide the information needed to generate your{" "}
              {templateType === "nda"
                ? "Non-Disclosure Agreement"
                : templateType === "freelance"
                  ? "Freelance Agreement"
                  : "IP Transfer Agreement"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yourName">Your Name</Label>
                  <Input
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the project or services"
                  rows={4}
                  required
                />
              </div>

              {templateType === "freelance" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {(templateType === "freelance" || templateType === "ip") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={handleGenerateContract} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Contract"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Review & Sign */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Review Contract</CardTitle>
                <CardDescription>Review your contract before sending it for signature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-card border rounded-md p-6 overflow-auto max-h-[600px] whitespace-pre-wrap font-mono text-sm">
                  {generatedContract}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Download PDF</Button>
                  <Button onClick={handleSendForSignature} className="gap-2" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send for Signature
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  AI Risk Assessment
                </CardTitle>
                <CardDescription>Our AI has analyzed your contract for potential risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Risk Score</Label>
                    <span className="text-sm font-medium">{riskAssessment.score}/100</span>
                  </div>
                  <Progress value={riskAssessment.score} className="h-2" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Potential Issues
                  </Label>
                  <ul className="space-y-1 text-sm">
                    {riskAssessment.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-500 text-lg leading-none">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Recommendations
                  </Label>
                  <ul className="space-y-1 text-sm">
                    {riskAssessment.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 text-lg leading-none">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>E-Signature Options</CardTitle>
                <CardDescription>Choose how you want to get your contract signed</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="docusign" className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="docusign" id="docusign" />
                    <Label htmlFor="docusign" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <img src="/placeholder.svg?height=20&width=100" alt="DocuSign" className="h-5 object-contain" />
                      <span>DocuSign</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="adobe" id="adobe" />
                    <Label htmlFor="adobe" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <img src="/placeholder.svg?height=20&width=100" alt="Adobe Sign" className="h-5 object-contain" />
                      <span>Adobe Sign</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="flex flex-1 items-center gap-2 cursor-pointer">
                      <Send className="h-4 w-4" />
                      <span>Email Link</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
