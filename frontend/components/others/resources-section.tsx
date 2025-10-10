'use client';
import { Shield, CheckCircle, FileCheck, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function ResourcesSection() {
  const handleDownload = (fileName: string, displayName: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `/assets/${fileName}`;
    link.download = displayName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resources" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your internal knowledge base with our expert-crafted materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileCheck className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>SOC 2 Starter Kit</CardTitle>
              <CardDescription>
                Policies, templates, and controls checklist to jumpstart your
                compliance journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() =>
                  handleDownload(
                    'soc2-starter-kit.pdf',
                    'SOC 2 Starter Kit - Cypentra.pdf'
                  )
                }>
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Cloud Security Cheat Sheet</CardTitle>
              <CardDescription>
                What to lock down first in AWS, Azure, or GCP — prioritized by
                risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() =>
                  handleDownload(
                    'cloud-security-cheat-sheet.pdf',
                    'Cloud Security Cheat Sheet - Cypentra.pdf'
                  )
                }>
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>PenTest Readiness Guide</CardTitle>
              <CardDescription>
                How to prep your team for a security assessment and maximize
                value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() =>
                  handleDownload(
                    'pentest-readiness-guide.pdf',
                    'PenTest Readiness Guide - Cypentra.pdf'
                  )
                }>
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              Free, no email gates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
