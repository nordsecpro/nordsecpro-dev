'use client';
import {
  FileCheck,
  AlertTriangle,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Book a Call Section Component
function BookCallSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Calendar className="h-16 w-16 mx-auto mb-6 text-blue-200" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Call</h2>
        <p className="text-xl text-blue-100 mb-8">
          We don't do hard sells. We solve real problems.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6">
            Schedule a 30-minute consultation to:
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Ask questions about your current security posture</span>
            </div>
            <div className="flex items-start space-x-3">
              <FileCheck className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Explore your SOC 2 or compliance roadmap</span>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
              <span>Get advice on urgent security concerns</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => (window.location.href = '/contact')}
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100">
          <Calendar className="h-5 w-5 mr-2" />
          Talk to a Security Expert
        </Button>
        <p className="text-sm text-blue-200 mt-4">
          No commitment required • 30 minutes • Free expert advice
        </p>
      </div>
    </section>
  );
}

export default BookCallSection;
