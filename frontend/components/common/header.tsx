import React from 'react';

const HeaderSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
        <span
          className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000"
          style={{ animationDelay: '200ms' }}>
          {title}
        </span>
      </h1>

      <div className="max-w-4xl mx-auto mt-10">
        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
