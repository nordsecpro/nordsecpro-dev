'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

// FAQ Section Component
function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: 'speed',
      question: 'How fast can you deliver a PenTest?',
      answer: 'Most assessments are completed in 7–10 business days.',
    },
    {
      id: 'audit',
      question: 'Do you help with the SOC 2 audit itself?',
      answer:
        "We prepare you fully and support you through the audit, but we don't act as the auditor.",
    },
    {
      id: 'timezone',
      question: 'What time zones do you support?',
      answer: 'We align with U.S. hours while operating 100% remotely.',
    },
    {
      id: 'team',
      question: 'Who performs the work?',
      answer:
        'All services are delivered by experienced professionals—no outsourcing, no junior handoffs.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FAQ
          </h2>
          <p className="text-xl text-gray-600">
            Common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader
                className="pb-4"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CardHeader>
              {openFAQ === faq.id && (
                <CardContent className="pt-0">
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
