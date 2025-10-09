'use client';
import {
  Shield,
  Eye,
  CheckCircle,
  FileCheck,
  Zap,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Services Section Component
function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Cybersecurity Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive remote cybersecurity solutions tailored to protect
            your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="min-h-[3rem] flex items-center">
                Security Assessments
              </CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Comprehensive evaluation of your current security posture and
                vulnerabilities
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
              <CardTitle className="min-h-[3rem] flex items-center">
                Security Implementation
              </CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Deploy robust security measures and protocols to protect your
                infrastructure
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
              <CardTitle className="min-h-[3rem] flex items-center">
                24/7 Monitoring
              </CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Continuous monitoring and threat detection to keep your systems
                secure
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
              <CardTitle className="min-h-[3rem] flex items-center">
                Security Training
              </CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Educate your team on cybersecurity best practices and threat
                awareness
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
              <CardTitle className="min-h-[3rem] flex items-center">
                Compliance Support
              </CardTitle>
              <CardDescription className="min-h-[4rem] flex items-center">
                Ensure your organization meets industry standards and regulatory
                requirements
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
              <CardTitle className="min-h-[3rem] flex items-center">
                Incident Response
              </CardTitle>
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
  );
}

export default ServicesSection;
