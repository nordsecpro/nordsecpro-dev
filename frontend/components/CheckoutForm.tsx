// components/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Loader2, ShoppingCart, Lock, CreditCard, User, Building2, Mail, Phone, FileText, Shield, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Terms and Conditions Component
function TermsModal({ isOpen, onClose, type }: {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}) {
  const content = type === 'terms' ? {
    title: 'Terms and Conditions',
    content: `
      1. Service Agreement
      By purchasing our security plans, you agree to our terms of service. These plans provide comprehensive security solutions tailored to your business needs.

      2. Payment Terms
      Payment is processed securely through Stripe. All transactions are encrypted and protected. Subscriptions will be automatically renewed unless cancelled.

      3. Service Delivery
      Upon successful payment, you will receive access to your selected security plan within 24-48 hours. Our team will contact you to begin implementation.

      4. Refund Policy
      Refunds are available within 30 days of purchase if you are not satisfied with our service. Contact our support team to initiate a refund request.

      5. Data Protection
      We are committed to protecting your personal and business data. All information is stored securely and never shared with third parties without consent.

      6. Limitation of Liability
      Our liability is limited to the amount paid for the service. We provide security solutions with industry-standard practices but cannot guarantee 100% protection against all threats.

      7. Termination
      Either party may terminate the service agreement with 30 days written notice. Upon termination, access to services will be discontinued.

      8. Updates to Terms
      These terms may be updated periodically. Users will be notified of significant changes via email.
    `
  } : {
    title: 'Privacy Policy',
    content: `
      1. Information We Collect
      We collect personal information including name, email, phone number, and company details to provide our security services effectively.

      2. How We Use Information
      Your information is used to deliver services, communicate updates, provide customer support, and improve our offerings.

      3. Data Storage and Security
      All personal data is encrypted and stored on secure servers. We implement industry-standard security measures to protect your information.

      4. Information Sharing
      We do not sell, trade, or share your personal information with third parties except as required by law or to provide requested services.

      5. Cookies and Tracking
      Our website uses cookies to improve user experience and analyze website performance. You can disable cookies in your browser settings.

      6. Your Rights
      You have the right to access, update, or delete your personal information. Contact us to exercise these rights.

      7. Data Retention
      We retain your information for as long as necessary to provide services and comply with legal obligations.

      8. Contact Information
      For privacy-related inquiries, contact us at privacy@company.com or through our support channels.
    `
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {content.title}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto py-4">
          <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
            {content.content}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced Customer Form Component
function CustomerForm({ onSubmit, isLoading, onShowTerms, onShowPrivacy }: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  onShowTerms: () => void;
  onShowPrivacy: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [cardReady, setCardReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms || !acceptPrivacy) {
      return;
    }
    onSubmit(formData);
  };

  const isFormValid = acceptTerms && acceptPrivacy && cardReady &&
    formData.firstName && formData.lastName && formData.email;

  return (
    <div className="space-y-8">
      {/* Customer Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            <p className="text-sm text-gray-500">Please provide your contact details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
              <div className="relative">
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="pl-4 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
              <div className="relative">
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="pl-4 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-11 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-11 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="pl-11 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Enter your company name"
                />
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Payment Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
                <p className="text-sm text-gray-500">Your payment details are secure and encrypted</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secured by Stripe</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Card Details *
              </Label>
              <div className="relative">
                <div className="p-4 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 bg-white">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                        invalid: {
                          color: '#EF4444',
                        },
                      },
                    }}
                    onChange={(event) => setCardReady(event.complete)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Terms and Conditions Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Terms & Agreements</h3>
                <p className="text-sm text-gray-500">Please review and accept our terms</p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    I agree to the Terms and Conditions *
                  </Label>
                  <p className="text-xs text-gray-500">
                    By checking this box, you agree to our service terms.{' '}
                    <button
                      type="button"
                      onClick={onShowTerms}
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Read Terms & Conditions
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={acceptPrivacy}
                  onCheckedChange={(checked) => setAcceptPrivacy(checked === true)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="privacy"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    I agree to the Privacy Policy *
                  </Label>
                  <p className="text-xs text-gray-500">
                    By checking this box, you consent to our data practices.{' '}
                    <button
                      type="button"
                      onClick={onShowPrivacy}
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Read Privacy Policy
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            {!isFormValid && (
              <Alert className="mb-4 border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Please fill in all required fields and accept the terms to proceed with payment.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading || !isFormValid}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="mr-3 h-5 w-5" />
                  Complete Secure Payment
                </>
              )}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                🔒 Your payment is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Enhanced Payment Form Component with SEPARATED PAYMENTS
function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState<string>('');
  const { selectedPlans, totalPrice, clearCart } = useCart();

  // Helper function to determine plan type
  const getPlanType = (planTitle: string) => {
    // Add your plan type logic here
    return planTitle === 'vCISO On-Demand' ? 'ongoing' : 'one-time';
  };

  // Separate plans by type
  const oneTimePlans = selectedPlans.filter(plan => getPlanType(plan.planTitle) === 'one-time');
  const ongoingPlans = selectedPlans.filter(plan => getPlanType(plan.planTitle) === 'ongoing');

  const handlePayment = async (customerData: any) => {
    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }
  
    if (selectedPlans.length === 0) {
      setError('No plans selected for checkout.');
      return;
    }

    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
      setError('First name, last name, and email are required.');
      return;
    }
  
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('customerData', customerData);
      console.log('oneTimePlans', oneTimePlans);
      console.log('ongoingPlans', ongoingPlans);

      let oneTimeResult = null;
      let ongoingResult = null;

      // Step 1: Process one-time plans if any exist
      if (oneTimePlans.length > 0) {
        setPaymentProgress('Processing one-time plans...');
        
        const oneTimeTotal = oneTimePlans.reduce((sum, plan) => sum + plan.price, 0);
        
        const oneTimeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscription/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plans: oneTimePlans,
            totalPrice: oneTimeTotal,
            customerData
          }),
        });

        if (!oneTimeResponse.ok) {
          const errorData = await oneTimeResponse.json();
          throw new Error(errorData.message || 'Failed to create one-time payment intent');
        }

        oneTimeResult = await oneTimeResponse.json();
        
        // Confirm one-time payment
        if (oneTimeResult.data.oneTime?.clientSecret) {
          const { error: oneTimeError } = await stripe.confirmCardPayment(oneTimeResult.data.oneTime.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: `${customerData.firstName} ${customerData.lastName}`,
                email: customerData.email,
                phone: customerData.phone,
              },
            }
          });

          if (oneTimeError) {
            throw new Error(oneTimeError.message || 'One-time payment failed');
          }
        }
      }

      // Step 2: Process ongoing plans if any exist
      if (ongoingPlans.length > 0) {
        setPaymentProgress('Processing ongoing subscription...');
        
        const ongoingTotal = ongoingPlans.reduce((sum, plan) => sum + plan.price, 0);
        
        const ongoingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscription/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plans: ongoingPlans,
            totalPrice: ongoingTotal,
            customerData
          }),
        });

        if (!ongoingResponse.ok) {
          const errorData = await ongoingResponse.json();
          
          // Handle the "already subscribed" case gracefully
          if (ongoingResponse.status === 400 && errorData.message?.includes('already have an active ongoing subscription')) {
            setError(`You already have an active ongoing subscription. ${oneTimePlans.length > 0 ? 'Your one-time plans were processed successfully.' : 'Please check your email for details about your existing subscription.'}`);
            
            // If one-time plans were successful, show partial success
            if (oneTimePlans.length > 0) {
              setSuccess(true);
              clearCart();
            }
            setIsLoading(false);
            return;
          }
          
          throw new Error(errorData.message || 'Failed to create ongoing payment intent');
        }

        ongoingResult = await ongoingResponse.json();
        
        // Confirm ongoing payment
        if (ongoingResult.data.ongoing?.clientSecret) {
          const { error: ongoingError } = await stripe.confirmCardPayment(ongoingResult.data.ongoing.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: `${customerData.firstName} ${customerData.lastName}`,
                email: customerData.email,
                phone: customerData.phone,
              },
            }
          });

          if (ongoingError) {
            throw new Error(ongoingError.message || 'Subscription payment failed');
          }
        }
      }

      setPaymentProgress('Payment completed successfully!');
      setSuccess(true);
      clearCart();
      
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
      setPaymentProgress('');
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-2xl">
          <CardContent className="pt-8 pb-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You will receive confirmation emails shortly with your receipt and next steps.
            </p>
            {oneTimePlans.length > 0 && ongoingPlans.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm">
                <p className="text-blue-800">
                  ✅ One-time plans: Processed immediately<br/>
                  ✅ Ongoing subscription: Activated with monthly billing
                </p>
              </div>
            )}
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Enhanced Order Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Order Summary</h2>
              <p className="text-sm font-normal text-gray-600 mt-1">
                {selectedPlans.length} {selectedPlans.length === 1 ? 'Plan' : 'Plans'} Selected
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Show one-time plans section */}
            {oneTimePlans.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  One-Time Plans ({oneTimePlans.length})
                </h4>
                {oneTimePlans.map((plan, index) => (
                  <div key={`onetime-${index}`} className="bg-green-50 p-4 rounded-lg mb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-lg text-gray-900">{plan.planTitle}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Coverage for {plan.numberOfEmployees} employees
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Comprehensive security solution
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-gray-900">${plan.price.toLocaleString()}</div>
                        <div className="text-sm text-green-600">one-time</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Show ongoing plans section */}
            {ongoingPlans.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Ongoing Subscription ({ongoingPlans.length})
                </h4>
                {ongoingPlans.map((plan, index) => (
                  <div key={`ongoing-${index}`} className="bg-blue-50 p-4 rounded-lg mb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-lg text-gray-900">{plan.planTitle}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Coverage for {plan.numberOfEmployees} employees
                        </div>
                        <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Cancel anytime with 30 days' notice
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-gray-900">${plan.price.toLocaleString()}</div>
                        <div className="text-sm text-blue-600">monthly</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-4" />

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
              </div>

              {oneTimePlans.length > 0 && ongoingPlans.length > 0 && (
                <div className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure payment will process both one-time and subscription charges
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Payment Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Complete Your Purchase</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Show payment progress */}
          {isLoading && paymentProgress && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-800 font-medium">
                {paymentProgress}
              </AlertDescription>
            </Alert>
          )}

          <CustomerForm
            onSubmit={handlePayment}
            isLoading={isLoading}
            onShowTerms={() => setShowTermsModal(true)}
            onShowPrivacy={() => setShowPrivacyModal(true)}
          />
        </CardContent>
      </Card>
      {/* Terms and Privacy Modals */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        type="terms"
      />
      <TermsModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        type="privacy"
      />
    </div>
  );
}

// Enhanced Main Checkout Component
export default function CheckoutForm() {

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Secure your business with our comprehensive security solutions.
              Your payment is protected with bank-level encryption.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Secured by Stripe</span>
            </div>
          </div>

          <PaymentForm />
        </div>
      </div>
    </Elements>
  );
}