// app/checkout/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Check,
  CheckCircle,
  Mail,
  ArrowRight,
  Home,
  FileText,
  Shield,
  CreditCard,
  Loader2,
  AlertCircle,
  Lock,
} from 'lucide-react';

interface PurchaseDetails {
  oneTimePlans?: Array<{
    planTitle: string;
    price: number;
    numberOfEmployees: number;
  }>;
  ongoingPlans?: Array<{
    planTitle: string;
    price: number;
    numberOfEmployees: number;
  }>;
  totalAmount?: number;
  customerEmail?: string;
  paymentId?: string;
  sessionId?: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const validateAndFetchDetails = async () => {
      try {
        // Check for payment session ID in URL parameters
        const sessionId = searchParams.get('session_id');
        const paymentIntent = searchParams.get('payment_intent');

        // Check for stored session data
        const storedSession = sessionStorage.getItem('paymentSession');
        const storedDetails = sessionStorage.getItem('purchaseDetails');

        // Method 1: Verify with backend using session ID
        if (sessionId || paymentIntent) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/verify-payment`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  sessionId,
                  paymentIntent,
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.purchaseDetails) {
                setPurchaseDetails(data.purchaseDetails);
                setIsValid(true);
                // Clear session storage after successful verification
                sessionStorage.removeItem('paymentSession');
                sessionStorage.removeItem('purchaseDetails');
                setIsLoading(false);
                return;
              }
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        }

        // Method 2: Check for valid session storage (temporary, expires quickly)
        if (storedSession && storedDetails) {
          try {
            const session = JSON.parse(storedSession);
            const details = JSON.parse(storedDetails);

            // Check if session is recent (within 5 minutes)
            const sessionTime = new Date(session.timestamp).getTime();
            const currentTime = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000;

            if (currentTime - sessionTime <= fiveMinutes && session.valid) {
              setPurchaseDetails(details);
              setIsValid(true);
              // Clear session storage after use
              sessionStorage.removeItem('paymentSession');
              sessionStorage.removeItem('purchaseDetails');
            } else {
              // Session expired
              sessionStorage.removeItem('paymentSession');
              sessionStorage.removeItem('purchaseDetails');
              setError(
                'Your session has expired. Please complete a new purchase.'
              );
              setIsValid(false);
            }
          } catch (error) {
            console.error('Error parsing session data:', error);
            setError('Invalid session data. Please complete a new purchase.');
            setIsValid(false);
          }
        } else {
          // No valid session or payment info found
          setError(
            'No valid payment session found. Please complete a purchase to access this page.'
          );
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error in validation:', error);
        setError('An error occurred while verifying your payment.');
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAndFetchDetails();
  }, [searchParams]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Access denied state
  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="pt-8 pb-6 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h3>
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                {error ||
                  'This page can only be accessed after completing a successful payment.'}
              </AlertDescription>
            </Alert>
            <p className="text-gray-600 mb-6">
              Please complete a purchase to access this page. If you believe
              this is an error, please contact our support team.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state - only shown if payment is verified
  const {
    oneTimePlans = [],
    ongoingPlans = [],
    totalAmount = 0,
    customerEmail,
    paymentId,
  } = purchaseDetails;
  const hasOneTime = oneTimePlans.length > 0;
  const hasOngoing = ongoingPlans.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-4">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-green-100 text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Order Confirmation Card */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Confirmed
                  </h2>
                  <p className="text-gray-600">
                    Order #{paymentId || 'ORD' + Date.now()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Email Confirmation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Confirmation Email Sent
                    </p>
                    <p className="text-sm text-gray-600">
                      We've sent a confirmation email to{' '}
                      <span className="font-medium">
                        {customerEmail || 'your email address'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Purchase Summary
                </h3>

                {/* One-time Plans */}
                {hasOneTime && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Shield className="w-4 h-4 text-green-600" />
                      One-Time Plans
                    </div>
                    {oneTimePlans.map((plan, index) => (
                      <div
                        key={`onetime-${index}`}
                        className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {plan.planTitle}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Coverage for {plan.numberOfEmployees} employees
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">
                              ${plan.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-green-600">One-time</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Ongoing Plans */}
                {hasOngoing && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      Subscription Plans
                    </div>
                    {ongoingPlans.map((plan, index) => (
                      <div
                        key={`ongoing-${index}`}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {plan.planTitle}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Coverage for {plan.numberOfEmployees} employees
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Auto-renews monthly • Cancel anytime
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">
                              ${plan.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-blue-600">Per month</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Charged Today:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Account Setup
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Our team will set up your account within the next 24-48
                      hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Welcome Call
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      A security specialist will contact you to schedule an
                      onboarding call.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Implementation
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      We'll begin implementing your security solutions according
                      to the selected plans.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg"
              size="lg">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>

            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg"
              size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Download Receipt
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-gray-600 mt-8">
            <p>
              Need help? Contact our support team at{' '}
              <a
                href="mailto:support@company.com"
                className="text-blue-600 hover:underline">
                support@company.com
              </a>
            </p>
            <p className="mt-2">
              Or call us at{' '}
              <a
                href="tel:1-800-123-4567"
                className="text-blue-600 hover:underline">
                1-800-123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
