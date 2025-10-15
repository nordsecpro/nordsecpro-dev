'use client';

function TrustSection() {
  const credentials = [
    {
      logo: '/logos/cissp.png',
      title: 'CISSP',
      description: 'Certified Information Systems Security Professional',
    },
    {
      logo: '/logos/oscp.png',
      title: 'OSCP',
      description: 'Offensive Security Certified Professional',
    },
    {
      logo: '/logos/aws.jpg',
      title: 'AWS Security',
      description: 'AWS Certified Security Specialist',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Trust & Certifications
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Security is only as strong as the team behind it
          </p>
        </div>

        <div className="mb-16">
          {/* Credentials Section */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl h-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                Our Credentials
              </h3>
            </div>

            <p className="text-slate-600 mb-8 text-lg text-center">
              Our team holds industry-leading certifications:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-20 h-20 mb-4">
                    <img
                      src={cred.logo}
                      alt={cred.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    {cred.title}
                  </h4>
                  <p className="text-sm text-slate-600">{cred.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
