// components/TermsModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {isTerms ? 'Terms and Conditions' : 'Privacy Policy'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto">
          {isTerms ? (
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="font-semibold text-lg mb-3">1. Services</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  NordSecPro provides cybersecurity consulting services including but not limited to:
                  security assessments, SOC 2 preparation, compliance support, and virtual CISO services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  All services are customized based on your organization's specific requirements and employee count.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">2. Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Payment is required in full before services commence. All prices are in USD and include applicable taxes.
                  Payments are processed securely through Stripe.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  No refunds are provided once services have begun, except in cases of material breach by NordSecPro.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">3. Service Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Services will be delivered within agreed timelines. Delays due to client unavailability or 
                  insufficient access to required systems may extend delivery timelines.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Client is responsible for providing necessary access, documentation, and cooperation required for service delivery.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">4. Confidentiality</h3>
                <p className="text-gray-700 leading-relaxed">
                  NordSecPro maintains strict confidentiality of all client information and data. 
                  We will not disclose any confidential information without written consent, except as required by law.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">5. Limitation of Liability</h3>
                <p className="text-gray-700 leading-relaxed">
                  NordSecPro's liability is limited to the amount paid for services. We provide consulting recommendations 
                  but cannot guarantee specific security outcomes or compliance certification results.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">6. Intellectual Property</h3>
                <p className="text-gray-700 leading-relaxed">
                  Deliverables created specifically for the client become client property upon full payment. 
                  NordSecPro retains rights to general methodologies, templates, and knowledge.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">7. Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  Either party may terminate ongoing services with 30 days written notice. 
                  Client remains liable for services rendered up to termination date.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">8. Governing Law</h3>
                <p className="text-gray-700 leading-relaxed">
                  These terms are governed by the laws of [Your State/Country]. 
                  Any disputes will be resolved through binding arbitration.
                </p>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  By proceeding with payment, you acknowledge that you have read, understood, and agree to these terms and conditions.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="font-semibold text-lg mb-3">Information We Collect</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect information you provide directly to us, including name, email, phone number, 
                  company information, and payment details necessary for service delivery.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">How We Use Information</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We use collected information to provide cybersecurity services, process payments, 
                  communicate about services, and improve our offerings.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">Information Sharing</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We do not sell or rent personal information. We may share information with service providers 
                  (like Stripe for payments) and as required by law.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">Data Security</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We implement appropriate security measures to protect personal information. 
                  Payment information is processed securely through Stripe and not stored on our servers.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-3">Your Rights</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You may request access to, correction of, or deletion of your personal information. 
                  Contact us at privacy@nordsecpro.com for data requests.
                </p>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        
        <div className="p-6 border-t">
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            I Understand
          </Button>
        </div>
      </Card>
    </div>
  );
}