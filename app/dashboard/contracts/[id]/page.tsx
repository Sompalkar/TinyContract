"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Download, Send, CheckCircle, Shield, AlertTriangle, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

type Contract = {
  _id: string
  title: string
  clientName: string
  clientEmail: string
  content: string
  status: string
  createdAt: string
  templateType: string
  projectDetails: {
    name: string
    description: string
  }
  riskAssessment?: {
    score: number
    issues: string[]
    recommendations: string[]
  }
}

export default function ContractDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchContract = async () => {
      try {
        // In a real implementation, this would fetch from the API
        // For the MVP, we'll use mock data
        setTimeout(() => {
          // Mock contract data
          const mockContract = {
            _id: params.id as string,
            title: "Website Development NDA",
            clientName: "Acme Corp",
            clientEmail: "contact@acmecorp.com",
            content: `
# NON-DISCLOSURE AGREEMENT

THIS AGREEMENT is made on ${new Date().toLocaleDateString()} between:

**John Doe** of **My Company** (the "Disclosing Party")

and

**Acme Corp** (the "Receiving Party")

## 1. PURPOSE

The parties wish to explore a business opportunity related to **Website Development Project** (the "Purpose").

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
John Doe
My Company

________________________
Acme Corp
            `,
            status: "pending",
            createdAt: "2025-04-15T10:30:00Z",
            templateType: "nda",
            projectDetails: {
              name: "Website Development Project",
              description: "Development of a corporate website with e-commerce functionality",
            },
            riskAssessment: {
              score: 85,
              issues: [
                "Confidentiality period could be more specific",
                "Jurisdiction clause needs strengthening"
              ],
              recommendations: [
                "Specify exact confidentiality period with clear start/end dates",
                "Add specific jurisdiction and venue for legal proceedings",
                "Include remedies for breach of confidentiality"
              ]
            }
          }
          
          setContract(mockContract)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching contract:", error)
        toast({
          title: "Error",
          description: "Failed to load contract. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    if (params.id) {
      fetchContract()
    }
  }, [params.id, toast])
  
  const handleSendForSignature = async () => {
    toast({
      title: "Success",
      description: "Contract sent for signature!",
    })
    
    // Update contract status locally
    if (contract) {
      setContract({
        ...contract,
        status: "pending"
      })
    }
  }
  
  const handleDownload = () => {
    if (!contract) return
    
    toast({
      title: "Downloading",
      description: "Your contract is being downloaded as PDF",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/contracts">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {loading ? <Skeleton className="h-8 w-[300px]" /> : contract?.title}
        </h1>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <div className="md:col-span-2">
            <Skeleton className="h-[500px]" />
          </div>
          <div>
            <Skeleton className="h-[250px] mb-6" />
            <Skeleton className="h-[200px]" />
          </div>
        </div>
      ) : contract ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium">{contract.clientName}</div>
                <div className="text-sm text-muted-foreground">{contract.clientEmail}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {contract.status === "signed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : contract.status === "pending" ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      contract.status === "signed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : contract.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : contract.status === "expired"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {contract.status === "signed" ? (
                    "Signed on " + new Date(contract.createdAt).toLocaleDateString()
                  ) : contract.status === "pending" ? (
                    "Waiting for signature"
                  ) : (
                    "Created on " + new Date(contract.createdAt).toLocaleDateString()
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium">{contract.projectDetails.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {contract.projectDetails.description}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Preview</CardTitle>
                      <CardDescription>
                        Review your contract before sending it for signature
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-card border rounded-md p-6 overflow-auto max-h-[600px] whitespace-pre-wrap font-mono text-sm">
                        {contract.content}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      {contract.status === "draft" && (
                        <Button onClick={handleSendForSignature}>
                          <Send className="mr-2 h-4 w-4" />
                          Send for Signature
                        </Button>
                      )}
                      {contract.status === "pending" && (
                        <Button onClick={() => toast({
                          title: "Reminder Sent",
                          description: "A reminder has been sent to the client"
                        })}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Reminder
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract History</CardTitle>
                      <CardDescription>
                        Track all changes and activities related to this contract
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm">
                              Contract created
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contract.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {contract.status === "pending" && (
                          <div className="flex items-start gap-4">
                            <div className="rounded-full p-2 bg-yellow-100 dark:bg-yellow-900">
                              <Send className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <p className="text-sm">
                                Sent to {contract.clientName} for signature
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(new Date(contract.createdAt).getTime() + 3600000).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {contract.status === "signed" && (
                          <div className="flex items-start gap-4">
                            <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm">
                                Signed by {contract.clientName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(new Date(contract.createdAt).getTime() + 86400000).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    AI Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Our AI has analyzed your contract for potential risks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contract.riskAssessment ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Risk Score</Label>
                          <span className="text-sm font-medium">{contract.riskAssessment.score}/100</span>
                        </div>
                        <Progress value={contract.riskAssessment.score} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          Potential Issues
                        </Label>
                        <ul className="space-y-1 text-sm">
                          {contract.riskAssessment.issues.map((issue, index) => (
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
                          {contract.riskAssessment.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500 text-lg leading-none">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Shield className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-center text-muted-foreground">
                        No risk assessment available for this contract
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Signature Status</CardTitle>
                  <CardDescription>
                    Track the signature process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contract.status === "draft" ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-center text-muted-foreground mb-4">
                        This contract hasn't been sent for signature yet
                      </p>
                      <Button onClick={handleSendForSignature}>
                        <Send className="mr-2 h-4 w-4" />
                        Send for Signature
                      </Button>
                    </div>
                  ) : contract.status === "pending" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-yellow-500" />
                          <span>Awaiting signature</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => toast({
                          title: "Reminder Sent",
                          description: "A reminder has been sent to the client"
                        })}>
                          Send Reminder
                        </Button>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <span className="font-medium">{contract.clientName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-4">
                          {contract.clientEmail}
                        </p>
                      </div>
                    </div>
                  ) : contract.status === "signed" ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>All parties have signed</span>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="font-medium">{contract.clientName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-4">
                          Signed on {new Date(new Date(contract.createdAt).getTime() + 86400000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (\
