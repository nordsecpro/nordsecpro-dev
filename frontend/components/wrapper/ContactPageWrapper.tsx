'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import ContactSection from '@/components/contact/contactSection';

export default function ContactPageWrapper() {
  const [verified, setVerified] = useState(false);

  const handleRecaptcha = (value: string | null) => {
    if (value) {
      // You can optionally send this token to your backend for verification
      setVerified(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!verified ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Verify You're Human</h2>
          <p className="mb-6 text-gray-600">
            Please complete the reCAPTCHA to access the Contact page.
          </p>
          <div className="flex items-center justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptcha}
            />
          </div>
        </div>
      ) : (
        <ContactSection />
      )}
    </div>
  );
}
