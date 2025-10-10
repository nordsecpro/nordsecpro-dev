'use client';
import {
  Shield,
  Users,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Secure Access Section Component
function SecureAccessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Secure Access & Credential Sharing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Cypentra.com, we take credential security seriously — even before
            any project begins.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="h-20 px-1 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src="/bitwarden-logo.png"
                  alt="Bitwarden"
                  className="w-auto h-12 filter brightness-0 invert"
                  // onError={(e) => {
                  //   // Fallback to text if image doesn't load
                  //   const img = e.target as HTMLImageElement;
                  //   img.style.display = 'none';
                  //   if (
                  //     img.nextSibling &&
                  //     img.nextSibling instanceof HTMLElement
                  //   ) {
                  //     (img.nextSibling as HTMLElement).style.display = 'flex';
                  //   }
                  // }}
                />
                <div className="w-8 h-8 hidden items-center justify-center">
                  <span className="text-white font-bold text-xs">BW</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Partnership with Bitwarden
                </h3>
                <p className="text-blue-800">
                  We partner with Bitwarden to ensure a safe and encrypted way
                  for our clients to share sensitive information like passwords,
                  API keys, or admin access.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Never Stored Permanently
                </h4>
                <p className="text-sm text-gray-600">
                  Your credentials are accessed only during active project work
                  and removed immediately after completion.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Used Only for Agreed Services
                </h4>
                <p className="text-sm text-gray-600">
                  Access is strictly limited to the specific services or
                  configurations outlined in our agreement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Fully Revocable
                </h4>
                <p className="text-sm text-gray-600">
                  You maintain complete control and can revoke access at any
                  time during or after the project.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">
                You're Always in Control
              </h3>
            </div>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you're unsure how to proceed with secure credential sharing,
              we'll walk you through the entire process during your free
              consultation call. Your security comes first.
            </p>
            <Button
              onClick={() => (window.location.href = '/contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Secure Onboarding Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecureAccessSection;
