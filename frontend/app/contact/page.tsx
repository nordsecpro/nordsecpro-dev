// app/contact/page.tsx or pages/contact.tsx
'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // For app directory
import {
  Mail,
  Menu,
  Globe,
  ArrowLeft,
  X,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  LucideIcon,
} from 'lucide-react';
import CartDropdown from '@/components/CartDropdown';

// Types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'danger';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'success' | 'error' | null;

// Professional Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary:
      'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-400',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    success: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    danger: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

// Professional Input Component
const Input: React.FC<InputProps> = ({
  label,
  required,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 bg-white border-2 rounded-lg transition-all duration-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-blue-400 focus:border-blue-500'
            : 'border-gray-200 focus:border-blue-400 hover:border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-blue-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

// Professional Textarea Component
const Textarea: React.FC<TextareaProps> = ({
  label,
  required,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full px-4 py-3 bg-white border-2 rounded-lg transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-blue-400 focus:border-blue-500'
            : 'border-gray-200 focus:border-blue-400 hover:border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-blue-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

// Logo Component
function CypentraLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/nord-logo.png"
        alt="Cypentra Logo"
        className="h-32 md:h-44 w-auto"
      />
    </div>
  );
}

// Main Contact Page Component
export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/contact`,
        {
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
            type: 'security_consultation',
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Secure Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              {' '}
              Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with our cybersecurity experts for a personalized
            consultation. We'll analyze your security needs and provide tailored
            solutions within 24 hours.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@cypentra.com"
                      className="text-blue-600 hover:text-blue-700 transition-colors">
                      info@cypentra.com
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Office Location
                    </h3>
                    <p className="text-gray-600">Nueva Andalucia district</p>
                    <p className="text-gray-600">Marbella-29069, Spain</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Remote-first team
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-600">Standard: 24 hours</p>
                    <p className="text-gray-600">Emergency: Immediate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="font-bold text-gray-900">
                  24/7 Emergency Support
                </h3>
              </div>
              <p className="text-gray-700 text-sm">
                For critical security incidents requiring immediate attention,
                our emergency response team is available around the clock.
              </p>
            </div>

            {/* Service Guarantees */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">
                Our Commitment
              </h3>
              {[
                'Free initial security assessment',
                'No obligation consultation',
                'Guaranteed 24-hour response',
                'Confidential security review',
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    error={errors.name}
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    error={errors.email}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    label="Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    helperText="Optional but helps us understand your needs"
                  />

                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What can we help you with?"
                    helperText="Brief description of your inquiry"
                  />
                </div>

                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your security needs, current challenges, or specific questions you have..."
                  error={errors.message}
                  helperText="Please provide as much detail as possible to help us serve you better"
                />

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push('/')}
                    disabled={isSubmitting}
                    className="sm:w-auto w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="sm:flex-1 w-full"
                    size="lg">
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                          Message Sent Successfully!
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Thank you for reaching out. Our security team will
                          review your inquiry and respond within 24 hours.
                          Redirecting you to the home page...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start">
                      <AlertCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                          Failed to Send Message
                        </h4>
                        <p className="text-blue-700 text-sm">
                          We encountered an issue sending your message. Please
                          try again or email us directly at{' '}
                          <a
                            href="mailto:info@cypentra.com"
                            className="underline hover:no-underline">
                            info@cypentra.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your information is transmitted securely and will only be
                  used to respond to your inquiry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
