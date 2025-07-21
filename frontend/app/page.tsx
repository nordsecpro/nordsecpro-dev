"use client"

import {
  Shield,
  Eye,
  Users,
  CheckCircle,
  Rocket,
  FileCheck,
  Search,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  BookOpen,
  Phone,
  Mail,
  Calendar,
  Download,
  Award,
  Target,
  MessageSquare,
  Globe,
  ArrowRight,
  Menu,
  X,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PriceCalculator from "@/components/price-calculator"
import CartDropdown from "@/components/CartDropdown"
import { useState, useEffect } from "react"

// NordSecPro Logo Component
function NordSecProLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/nord-logo.png"
        alt="NordSecPro Logo"
        className="h-28 lg:h-36 w-auto"
      />
    </div>
  )
}

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to handle navigation with URL update
  const handleNavigation = (sectionId: string, path: string) => {
    // Scroll to section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    // Update URL without page reload
    window.history.pushState({}, '', path);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <NordSecProLogo />

          {/* Desktop Navigation - Responsive breakpoints */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <a 
              href="/services" 
              onClick={(e) => { e.preventDefault(); handleNavigation('services', '/services'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Services
            </a>
            <a 
              href="/packages" 
              onClick={(e) => { e.preventDefault(); handleNavigation('packages', '/packages'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Packages
            </a>
            <a 
              href="/about" 
              onClick={(e) => { e.preventDefault(); handleNavigation('about', '/about'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              About
            </a>
            <a 
              href="/case-studies" 
              onClick={(e) => { e.preventDefault(); handleNavigation('case-studies', '/case-studies'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Case Studies
            </a>
            <a 
              href="/resources" 
              onClick={(e) => { e.preventDefault(); handleNavigation('resources', '/resources'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Resources
            </a>
            <a 
              href="/insights" 
              onClick={(e) => { e.preventDefault(); handleNavigation('insights', '/insights'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Insights
            </a>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact', '/contact'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Medium Screen Navigation - Shows fewer items */}
          <nav className="hidden md:flex lg:hidden space-x-4">
            <a 
              href="/services" 
              onClick={(e) => { e.preventDefault(); handleNavigation('services', '/services'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Services
            </a>
            <a 
              href="/packages" 
              onClick={(e) => { e.preventDefault(); handleNavigation('packages', '/packages'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Packages
            </a>
            <a 
              href="/about" 
              onClick={(e) => { e.preventDefault(); handleNavigation('about', '/about'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              About
            </a>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact', '/contact'); }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart - Always visible */}
            <CartDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full navigation for small screens */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
          }`}>
          <nav className="space-y-1 pt-4 border-t">
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); handleNavigation('services', '/services'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Services
            </a>
            <a
              href="/packages"
              onClick={(e) => { e.preventDefault(); handleNavigation('packages', '/packages'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Packages
            </a>
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); handleNavigation('about', '/about'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              About
            </a>
            <a
              href="/case-studies"
              onClick={(e) => { e.preventDefault(); handleNavigation('case-studies', '/case-studies'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Case Studies
            </a>
            <a
              href="/resources"
              onClick={(e) => { e.preventDefault(); handleNavigation('resources', '/resources'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Resources
            </a>
            <a
              href="/insights"
              onClick={(e) => { e.preventDefault(); handleNavigation('insights', '/insights'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Insights
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigation('contact', '/contact'); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer"
            >
              Contact
            </a>

          </nav>
        </div>
      </div>
    </header>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SOC 2 & Cloud Security Experts
            <span className="block text-blue-200">— Trusted by US SaaS Companies</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Get compliant, secure, and audit-ready — fast. Remote cybersecurity consulting by certified experts. Flat
            fees. No hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              });
            }} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-2" />
              Talk to a Security Expert
            </Button>
            <Button onClick={() => {
              document.getElementById('price')?.scrollIntoView({
                behavior: 'smooth'
              });
            }} size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              See Pricing & Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section Component
function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cybersecurity Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive remote cybersecurity solutions tailored to protect your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">Security Assessments</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Comprehensive evaluation of your current security posture and vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Penetration Testing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Vulnerability Scanning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Risk Analysis
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">Security Implementation</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Deploy robust security measures and protocols to protect your infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Firewall Configuration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Access Control
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Encryption Setup
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <Eye className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">24/7 Monitoring</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Continuous monitoring and threat detection to keep your systems secure
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Real-time Alerts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Incident Response
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Threat Intelligence
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">Security Training</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Educate your team on cybersecurity best practices and threat awareness
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Phishing Simulation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Security Workshops
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Policy Development
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <FileCheck className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">Compliance Support</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Ensure your organization meets industry standards and regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  GDPR Compliance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  ISO 27001
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  SOC 2
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <AlertTriangle className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">Incident Response</CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Rapid response and recovery services for cybersecurity incidents
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Emergency Response
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Incident Analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Recovery Planning
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Packages Section Component
function PackagesSection() {
  const [expandedPackages, setExpandedPackages] = useState<{ [key: string]: boolean }>({})

  const togglePackage = (packageId: string) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }))
  }

  return (
    <section id="packages" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Remove Shield icon for mobile, show only on lg+ */}
          <div className="hidden lg:flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Security & Compliance Packages</h2>
          </div>
          <div className="lg:hidden mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Security & Compliance Packages</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for Scaling Startups — Tailored security solutions for every stage of your business growth
          </p>
        </div>

        {/* No Contract Banner */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 px-8 py-4 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold text-green-800">No contract. Cancel anytime.</span>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="mt-3 text-gray-600">Flexible cybersecurity services that adapt to your business needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* 1. Startup Security Launchpad */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-blue-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                1. Startup Security Launchpad
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For early-stage startups and SaaS companies (5–25 employees)
              </CardDescription>
              <div className="bg-blue-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-blue-800 font-semibold italic">
                  "Your first vCISO — everything you need to prove you're security-conscious to partners, investors,
                  and customers."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage("startup")}
                  className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <span>{expandedPackages["startup"] ? "Hide Details" : "What's Included"}</span>
                  {expandedPackages["startup"] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages["startup"] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Initial 1:1 discovery session with security expert</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Tailored written report with actionable steps</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Custom security policy templates</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Product-specific risk checklist</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Drafted incident response plan</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Vendor security evaluation checklist</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Cloud infrastructure security review</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">1-hour live Q&A strategy call</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">14 days email support post-delivery</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 2. SOC 2 Pre-Audit Blueprint */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 border-blue-500 bg-gradient-to-b from-blue-50 to-white h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="relative w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-7 w-24 py-1 bg-blue-100 text-sm rounded-full">
                  <span>Top Choice</span>
                </div>
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                2. SOC 2 Pre-Audit Blueprint
              </CardTitle>
              <CardDescription className="text-blue-700 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For B2B SaaS preparing for enterprise contracts or VC due diligence
              </CardDescription>
              <div className="bg-blue-100 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-blue-800 font-semibold italic">
                  "Avoid guesswork. Get a clear SOC 2 roadmap, policies, and tooling to stay compliant without wasting
                  months."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage("soc2")}
                  className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <span>{expandedPackages["soc2"] ? "Hide Details" : "What's Included"}</span>
                  {expandedPackages["soc2"] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages["soc2"] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">SOC 2 gap assessment</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Custom implementation roadmap</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Compliance tooling onboarding (Vanta, Drata)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Internal training & documentation templates</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 3. Audit Check: Final Review */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-green-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                3. Audit Check: Final Review
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For teams close to SOC 2 Type II audit needing professional final review
              </CardDescription>
              <div className="bg-green-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-green-800 font-semibold italic">
                  "A second set of expert eyes before the auditors arrive — so nothing gets missed."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage("audit")}
                  className="flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <span>{expandedPackages["audit"] ? "Hide Details" : "What's Included"}</span>
                  {expandedPackages["audit"] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages["audit"] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Full review of evidence & controls</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Pre-audit checklist</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Auditor coordination</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Remediation guidance</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 4. vCISO On-Demand */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-purple-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                4. vCISO On-Demand
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For growing tech companies (25–250 employees) with ongoing needs
              </CardDescription>
              <div className="bg-purple-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-purple-800 font-semibold italic">
                  "Enterprise-grade security leadership — without hiring full-time."
                </p>
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage("vciso")}
                  className="flex items-center space-x-2 text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <span>{expandedPackages["vciso"] ? "Hide Details" : "What's Included"}</span>
                  {expandedPackages["vciso"] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages["vciso"] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Ongoing vCISO engagement (8–12 hours/month)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Monthly compliance reporting</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Multi-framework support (SOC 2, ISO 27001, HIPAA)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">Risk management and leadership advisory</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>


        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Us Section Component
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              We are a cybersecurity firm built for the speed, scale, and sensitivity of modern SaaS businesses.
              Founded by Scandinavian engineers and operating on U.S. time zones, we deliver high-caliber,
              hands-on security services without the noise or overhead.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Philosophy</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Security should enable growth, not obstruct it.</p>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Communication should be direct and jargon-free.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">Results should be fast, tangible, and defensible.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Exist</h3>
            <p className="text-gray-700 leading-relaxed">
              We saw too many startups overwhelmed by compliance, underwhelmed by overpriced consultants,
              and let down by cookie-cutter solutions. So we built something better.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-32">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">Who We Are</h3>

        {/* Triangle Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* CEO - Top Center */}
          <div className="flex justify-center relative">
            <div className="text-center">
              <img
                src="/team/sam.jpg"
                alt="Sam Josefsson"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">Sam Josefi</p>
              <p className="text-sm text-gray-500">CEO</p>

              {/* Connecting Lines */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-2">
                <div className="flex justify-between w-48 mx-auto">
                  {/* Left Line */}
                  <div className="w-0.5 h-20 bg-gray-300 transform rotate-45 origin-top-left"></div>
                  {/* Right Line */}
                  <div className="w-0.5 h-20 bg-gray-300 transform -rotate-45 origin-top-right"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Left & Right Team Members */}
          <div className="mt-24 flex justify-center md:space-x-52 space-y-12 md:space-y-0 flex-col md:flex-row items-center">
            {/* Left Member */}
            <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
              <img
                src="/team/eric.jpg"
                alt="Eric"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">Eric Slavic</p>
              <p className="text-sm text-gray-500 text-center">SOC 2 Compliance Specialist</p>
            </div>

            {/* Right Member */}
            <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
              <img
                src="/team/victor.jpg"
                alt="Victor Snorklasev"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">Victor Snorklasev</p>
              <p className="text-sm text-gray-500 text-center">DevSecOps Engineer</p>
            </div>
          </div>
        </div>
      </div>



    </section>
  )
}

// Case Studies Section Component
function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results for real businesses — see how we've helped companies secure their growth
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">SaaS Startup</span>
              </div>
              <CardTitle>Fast-Track to SOC 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> Early-stage HR tech platform
              </p>
              <p className="text-gray-700 mb-6">
                We helped the CTO implement controls, draft policies, and pass their audit in under 12 weeks.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  <strong>Outcome:</strong> Enterprise client win and faster due diligence for investors.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Fintech Platform</span>
              </div>
              <CardTitle>Deep Penetration Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> Series B payments company
              </p>
              <p className="text-gray-700 mb-6">
                Our test uncovered two critical flaws missed by prior assessments. With our remediation plan,
                they closed a seven-figure funding round.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-semibold">
                  <strong>Result:</strong> Critical vulnerabilities patched, funding secured.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Cloud Security</span>
              </div>
              <CardTitle>Security Overhaul</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> AI SaaS with hybrid AWS/Azure environment
              </p>
              <p className="text-gray-700 mb-6">
                We delivered a prioritized roadmap that eliminated 85% of open cloud risks within 30 days.
              </p>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-orange-800 font-semibold">
                  <strong>Impact:</strong> 85% risk reduction in 30 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Book a Call Section Component
function BookCallSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Calendar className="h-16 w-16 mx-auto mb-6 text-blue-200" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Call</h2>
        <p className="text-xl text-blue-100 mb-8">
          We don't do hard sells. We solve real problems.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6">Schedule a 30-minute consultation to:</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Ask questions about your current security posture</span>
            </div>
            <div className="flex items-start space-x-3">
              <FileCheck className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Explore your SOC 2 or compliance roadmap</span>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Get advice on urgent security concerns</span>
            </div>
          </div>
        </div>

        <Button onClick={() => {
          document.getElementById('contact')?.scrollIntoView({
            behavior: 'smooth'
          });
        }} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          <Calendar className="h-5 w-5 mr-2" />
          Talk to a Security Expert
        </Button>
        <p className="text-sm text-blue-200 mt-4">No commitment required • 30 minutes • Free expert advice</p>
      </div>
    </section>
  )
}

function ResourcesSection() {
  const handleDownload = (fileName, displayName) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `/assets/${fileName}`;
    link.download = displayName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resources" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your internal knowledge base with our expert-crafted materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileCheck className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>SOC 2 Starter Kit</CardTitle>
              <CardDescription>
                Policies, templates, and controls checklist to jumpstart your compliance journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleDownload('soc2-starter-kit.pdf', 'SOC 2 Starter Kit - Nord Sec Pro.pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Cloud Security Cheat Sheet</CardTitle>
              <CardDescription>
                What to lock down first in AWS, Azure, or GCP — prioritized by risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleDownload('cloud-security-cheat-sheet.pdf', 'Cloud Security Cheat Sheet - Nord Sec Pro.pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>PenTest Readiness Guide</CardTitle>
              <CardDescription>
                How to prep your team for a security assessment and maximize value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleDownload('pentest-readiness-guide.pdf', 'PenTest Readiness Guide - Nord Sec Pro.pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">Free, no email gates</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Insights Section Component
function InsightsSection() {
  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Actionable ideas. No fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-blue-600 font-semibold mb-2">COMPLIANCE</div>
              <CardTitle className="text-lg">SOC 2 vs ISO 27001: What Your SaaS Needs to Know</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Understanding the key differences and choosing the right framework for your business stage.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-purple-600 font-semibold mb-2">FUNDING</div>
              <CardTitle className="text-lg">Security Debt: The Silent Killer of Series A Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                How security gaps can derail fundraising and what VCs really look for in due diligence.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-green-600 font-semibold mb-2">STRATEGY</div>
              <CardTitle className="text-lg">Prioritizing Security with a Team of Three</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Practical security wins for resource-constrained startups — maximum impact, minimal overhead.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// FAQ Section Component
function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const faqs = [
    {
      id: "speed",
      question: "How fast can you deliver a PenTest?",
      answer: "Most assessments are completed in 7–10 business days."
    },
    {
      id: "audit",
      question: "Do you help with the SOC 2 audit itself?",
      answer: "We prepare you fully and support you through the audit, but we don't act as the auditor."
    },
    {
      id: "timezone",
      question: "What time zones do you support?",
      answer: "We align with U.S. hours while operating 100% remotely."
    },
    {
      id: "team",
      question: "Who performs the work?",
      answer: "All services are delivered by experienced professionals—no outsourcing, no junior handoffs."
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
          <p className="text-xl text-gray-600">Common questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader
                className="pb-4"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CardHeader>
              {openFAQ === faq.id && (
                <CardContent className="pt-0">
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trust & Certifications Section Component
function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trust & Certifications</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Security is only as strong as the team behind it
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our team holds credentials including:</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">CISSP (Certified Information Systems Security Professional)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">OSCP (Offensive Security Certified Professional)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">AWS Certified Security Specialist</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance experience:</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">SOC 2, ISO 27001, PCI-DSS</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">SaaS platforms, fintech firms, and high-growth startups</span>
              </div>
            </div>
            <p className="text-gray-600">
              Due diligence support available for VC funding, M&A, and enterprise onboarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Component
function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide to protect their digital assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07 3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic flex-grow">
                "NordSecPro transformed our security posture completely. Their remote monitoring caught three
                potential breaches before they could cause damage. Best investment we've made."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">CTO, TechFlow Solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07 3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic flex-grow">
                "Their compliance support was instrumental in achieving SOC 2 certification. Highly recommend!"
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">CEO, SecureTech Inc.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07 3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic flex-grow">
                "The security training sessions were incredibly insightful and helped our team stay ahead of threats."
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">EM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Smith</p>
                  <p className="text-sm text-gray-500">IT Manager, DataSecure Corp.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject || 'Security Consultation Request',
          message: formData.message,
          type: 'security_consultation'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form after successful submission
        setTimeout(() => {
          setIsDialogOpen(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          })
          setSubmitStatus(null)
        }, 2000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Nord Sec Pro</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to secure your business? Let's discuss your cybersecurity needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-8">Get in touch with our security experts</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Globe className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="font-semibold">Office Locations</p>
                    <p className="text-gray-300">Remote offices based in:</p>
                    <a
                      href="https://www.google.com/maps/place/Nueva+Andaluc%C3%ADa,+29660+Marbella,+M%C3%A1laga,+Spain/@36.504587,-4.9670655,5869m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd7329f95778141f:0x89f7238dbe6dc699!8m2!3d36.4923752!4d-4.9516096!16s%2Fg%2F122y5q61?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    >
                      Nueva Andalucia district of Marbella-29069, Spain
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Support Info */}
              <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <h4 className="font-semibold text-blue-400 mb-2">24/7 Emergency Support</h4>
                <p className="text-sm text-gray-300">
                  For urgent security incidents, our emergency response team is available around the clock.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">Ready to strengthen your security?</h3>
              <p className="text-gray-300 mb-6">
                Schedule a free security consultation or send us your requirements.
                We'll respond within 24 hours.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Talk to a Security Expert
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:info@nordsecpro.com'}
                  className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-200"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Security Inquiry
                </Button>
              </div>

              {/* Response Time Promise */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Guaranteed response within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mt-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free initial security assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mt-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No commitment consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Contact Our Security Team</h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Submit your inquiry and our security experts will contact you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your security needs, challenges, or questions..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-green-800 font-medium">
                        Inquiry submitted successfully! We'll contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-800 font-medium">
                        Failed to submit inquiry. Please try again or email us directly at info@nordsecpro.com
                      </p>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Your inquiry will be sent securely to our security team at info@nordsecpro.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="relative">
        {/* Decorative Element */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Brand Section - Spans 5 columns on large screens */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <NordSecProLogo className="filter invert brightness-0 w-36 mb-6" />
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Cybersecurity consulting built for modern SaaS businesses.
                  Fast, reliable, and focused on enabling your growth.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Secure Payments</p>
                <img
                  src="/payment-icons.png"
                  alt="Accepted payment methods"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Trust Badges */}
              <div className="flex space-x-4 pt-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">ISO 27001</span>
                </div>
              </div>
            </div>

            {/* Links Section - Spans 7 columns on large screens */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Security Assessments
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      SOC 2 Compliance
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      24/7 Monitoring
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      vCISO Services
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#resources" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      SOC 2 Starter Kit
                    </a>
                  </li>
                  <li>
                    <a href="#resources" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Security Guides
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/assets/privacy-notice.pdf"
                      download
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Download Privacy Notice
                      <svg className="w-3 h-3 ml-1 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/assets/privacy_policy.pdf"
                      download
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Download Privacy Policy
                      <svg className="w-3 h-3 ml-1 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/assets/terms_of_service.pdf"
                      download
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Download Terms of Service
                      <svg className="w-3 h-3 ml-1 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/assets/cookie_policy.pdf"
                      download
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Download Cookie Policy
                      <svg className="w-3 h-3 ml-1 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left Side: Copyright & Tagline */}
              <div className="flex items-center space-x-6">
                <p className="text-gray-500 text-sm">
                  © 2025 NordSecPro. All rights reserved.
                </p>
                <div className="flex items-center space-x-1 text-gray-600">
                  <span className="text-xs">Built with</span>
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">for security</span>
                </div>
              </div>

              {/* Right Side: Trust Statement */}
              <div className="text-sm text-gray-500 text-center md:text-right">
                Trusted by SaaS teams worldwide • Committed to your compliance
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}



// Price Calculator Section Component
function PriceCalculatorSection() {
  return (
    <section id="price" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceCalculator />
      </div>
    </section>
  )
}

// Main App Component - Optimized sequence for user journey and conversions
export default function CompleteNordSecProApp() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Navigation - Always first for easy access */}
      <Header />

      {/* 2. Hero - Immediate value proposition and CTA */}
      <HeroSection />




      {/* 5. Packages - Core offerings with pricing */}
      <PackagesSection />

      {/* 6. Price Calculator - Interactive engagement */}
      <PriceCalculatorSection />


      {/* 3. Trust Signals - Build credibility early */}
      <TrustSection />


      {/* 4. Services Overview - What you offer */}
      <ServicesSection />

      {/* 7. About - Build trust and expertise */}
      <AboutSection />

      {/* 8. Case Studies - Social proof and results */}
      <CaseStudiesSection />

      {/* 9. Testimonials - More social proof */}
      <TestimonialsSection />

      {/* 10. Book Call CTA - Primary conversion point */}
      <BookCallSection />

      {/* 11. Insights - Thought leadership content */}
      <InsightsSection />

      {/* 12. Resources - Additional value */}
      <ResourcesSection />

      {/* 13. FAQ - Address objections */}
      <FAQSection />

      {/* 14. Contact - Final conversion opportunity */}
      <ContactSection />

      {/* 15. Footer - Navigation and legal */}
      <Footer />
    </div>
  )
}