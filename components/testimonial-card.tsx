import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl?: string
  className?: string
}

export default function TestimonialCard({ quote, author, role, avatarUrl, className }: TestimonialCardProps) {
  return (
    <Card className={cn("border-none shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <Quote className="h-8 w-8 text-primary/40" />
          <p className="text-foreground italic">"{quote}"</p>
          <div className="mt-4 flex items-center gap-3">
            {avatarUrl && (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={avatarUrl || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
