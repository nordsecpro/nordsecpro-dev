'use client';
import { Mail, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Contact Section Component
function ContactSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  ); // 'success', 'error', or null

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
        // Reset form after successful submission
        setTimeout(() => {
          setIsDialogOpen(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            subject: '',
            message: '',
          });
          setSubmitStatus(null);
        }, 2000);
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
    <>
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contact Cypentra
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to secure your business? Let's discuss your cybersecurity
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-8">
                Get in touch with our security experts
              </h3>
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
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                      Nueva Andalucia district of Marbella-29069, Spain
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Support Info */}
              <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <h4 className="font-semibold text-blue-400 mb-2">
                  24/7 Emergency Support
                </h4>
                <p className="text-sm text-gray-300">
                  For urgent security incidents, our emergency response team is
                  available around the clock.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">
                Ready to strengthen your security?
              </h3>
              <p className="text-gray-300 mb-6">
                Schedule a free security consultation or send us your
                requirements. We'll respond within 24 hours.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => (window.location.href = '/contact')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  Talk to a Security Expert
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = 'mailto:info@cypentra.com')
                  }
                  className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-200">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Security Inquiry
                </Button>
              </div>

              {/* Response Time Promise */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <svg
                    className="h-4 w-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Guaranteed response within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mt-2">
                  <svg
                    className="h-4 w-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free initial security assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mt-2">
                  <svg
                    className="h-4 w-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
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
                <h3 className="text-xl font-bold text-gray-900">
                  Contact Our Security Team
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Submit your inquiry and our security experts will contact you
                within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed">
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
                      <svg
                        className="h-5 w-5 text-green-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-green-800 font-medium">
                        Inquiry submitted successfully! We'll contact you within
                        24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-800 font-medium">
                        Failed to submit inquiry. Please try again or email us
                        directly at info@cypentra.com
                      </p>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Your inquiry will be sent securely to our security team at
                  info@cypentra.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactSection;
