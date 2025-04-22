import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import HeroAnimation from "@/components/hero-animation"
import { StepCard } from "@/components/step-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LegalAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                    Now with AI-powered risk assessment
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
                    AI-Powered Contracts — Signed in One Click
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in-delay">
                    Generate legally sound contracts with AI. Perfect for freelancers, businesses, and legal
                    professionals in India.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-delay-2">
                  <Link href="/dashboard/create">
                    <Button size="lg" className="gap-1 group">
                      Create Your First Contract
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create, manage, and sign contracts with ease
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="AI-Powered Generation"
                description="Generate professional contracts in seconds with our advanced AI engine that suggests optimal clauses"
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="E-Signature Integration"
                description="Seamless integration with DocuSign and Adobe Sign for quick and legally binding signatures"
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="India-Localized Templates"
                description="Templates drafted in compliance with Indian regulations and legal requirements"
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Document Management"
                description="Store, track, and manage all your contracts in one place with automated reminders"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create and sign contracts in three simple steps
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <StepCard
                number={1}
                title="Select Template"
                description="Choose from a variety of templates including NDAs, freelance agreements, and IP transfers"
              />
              <StepCard
                number={2}
                title="AI Fills Docs"
                description="Our AI engine populates the template with your project details and suggests optimal clauses"
              />
              <StepCard
                number={3}
                title="E-Sign & Store"
                description="Send for signature with one click and store your signed contracts securely"
              />
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/dashboard/create">
                <Button size="lg" className="group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from professionals who use LegalAI
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <TestimonialCard
                quote="Saved me hours drafting NDAs! The AI suggestions are spot on and the e-signature feature is seamless."
                author="Priya Sharma"
                role="Freelance Designer"
                avatarUrl="/placeholder.svg?height=40&width=40"
              />
              <TestimonialCard
                quote="As a developer, I needed contracts that protect my IP. LegalAI made it simple with templates that actually make sense."
                author="Rahul Mehta"
                role="Software Developer"
                avatarUrl="/placeholder.svg?height=40&width=40"
              />
              <TestimonialCard
                quote="The India-specific templates are a game-changer for my consulting business. Compliance has never been easier."
                author="Ananya Patel"
                role="Business Consultant"
                avatarUrl="/placeholder.svg?height=40&width=40"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Contracts?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who trust LegalAI
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard/create">
                  <Button size="lg" variant="secondary" className="gap-1 group">
                    Create Your First Contract
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">LegalAI</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 LegalAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
