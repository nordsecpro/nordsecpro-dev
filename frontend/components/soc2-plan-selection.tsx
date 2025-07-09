"use client"
import { ArrowLeft, CheckCircle, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SOC2PlanSelectionProps {
  onBack: () => void
}

export default function SOC2PlanSelection({ onBack }: SOC2PlanSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your SOC 2 Readiness Timeline</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the timeline that best fits your organization's needs and current security maturity
            </p>
          </div>
        </div>

        {/* Timeline Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Track */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 border-blue-500 bg-gradient-to-b from-blue-50 to-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Recommended</span>
            </div>
            <CardHeader className="text-center pb-6 pt-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Standard Track</CardTitle>
              <div className="text-4xl font-bold text-blue-900 mb-2">$8,900</div>
              <div className="text-lg text-blue-700 mb-4">8-10 weeks timeline</div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Comprehensive preparation with extensive coaching
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Comprehensive GAP analysis (2 weeks)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Custom policy development (3 weeks)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Security controls implementation (2-3 weeks)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Team training and coaching (ongoing)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Pre-audit readiness review (1 week)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Full support during audit</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Best for:</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Organizations new to SOC 2 compliance</li>
                  <li>• Companies needing comprehensive security overhaul</li>
                  <li>• Teams requiring extensive training and support</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3">
                  Choose Standard Track
                </Button>
              </div>

              <div className="pt-2 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.90-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305h0z" />
                  </svg>
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accelerated Track */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 border-orange-500 bg-gradient-to-b from-orange-50 to-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Fast Track</span>
            </div>
            <CardHeader className="text-center pb-6 pt-8">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Accelerated Track</CardTitle>
              <div className="text-4xl font-bold text-orange-900 mb-2">$11,000 - $12,500</div>
              <div className="text-lg text-orange-700 mb-4">4-6 weeks timeline</div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                For organizations with existing security foundations
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Rapid GAP analysis (1 week)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Streamlined policy adaptation (1-2 weeks)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Priority controls implementation (1-2 weeks)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Focused team training sessions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Express readiness validation (3-5 days)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Priority support during audit</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-medium text-orange-900 mb-2">Best for:</h5>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Companies with existing security programs</li>
                  <li>• Organizations with tight audit deadlines</li>
                  <li>• Teams familiar with compliance frameworks</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-3">
                  Choose Accelerated Track
                </Button>
              </div>

              <div className="pt-2 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.90-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305h0z" />
                  </svg>
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Track to Choose?</h3>
            <p className="text-gray-600 mb-6">
              Our experts can help you determine the best timeline based on your current security posture, audit
              requirements, and organizational readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Schedule Assessment Call
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Personalized Recommendation</Button>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}
