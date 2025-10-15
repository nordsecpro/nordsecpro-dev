'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Send,
} from 'lucide-react';

// Input Component
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
};

function Input({ label, required, error, helperText, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
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
}

// Textarea Component
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
};

function Textarea({
  label,
  required,
  error,
  helperText,
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
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
}

// Hero Section
function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Let's Secure Your
            <span className="block text-blue-600 mt-2">Business</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Connect with our cybersecurity experts for a personalized
            consultation. We'll analyze your security needs and provide tailored
            solutions within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// Contact Form and Info Section
function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  type Errors = {
    name?: string;
    email?: string;
    message?: string;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success'>(null);

  const validateForm = () => {
    const newErrors: Errors = {};

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (['name', 'email', 'message'].includes(name)) {
      if (errors[name as keyof Errors]) {
        setErrors((prev) => ({ ...prev, [name as keyof Errors]: '' }));
      }
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@securecore.com"
                      className="text-blue-600 hover:text-blue-700">
                      info@securecore.com
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-600" />
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
                  <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
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

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-md text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6" />
                <h3 className="font-bold text-lg">24/7 Emergency Support</h3>
              </div>
              <p className="text-blue-50">
                For critical security incidents requiring immediate attention,
                our emergency response team is available around the clock.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Our Commitment
              </h3>
              <div className="space-y-3">
                {[
                  'Free initial security assessment',
                  'No obligation consultation',
                  'Guaranteed 24-hour response',
                  'Confidential security review',
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              <div className="space-y-6">
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
                  placeholder="Tell us about your security needs, current challenges, or specific questions..."
                  error={errors.message}
                  helperText="Please provide as much detail as possible"
                />

                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-4 rounded-lg font-semibold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                          Message Sent Successfully!
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Thank you for reaching out. Our security team will
                          review your inquiry and respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Your information is transmitted securely and will only be used
                  to respond to your inquiry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <div className="bg-white min-h-screen">
      <ContactHero />
      <ContactContent />
    </div>
  );
}

export default ContactSection;
