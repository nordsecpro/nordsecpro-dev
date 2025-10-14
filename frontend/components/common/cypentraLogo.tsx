'use client';
import Link from 'next/dist/client/link';

// Cypentra Logo Component
function CypentraLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/">
        <img
          src="/nord-logo.png"
          alt="Cypentra Logo"
          className="h-32 md:h-44 w-auto"
        />
      </Link>
    </div>
  );
}

export default CypentraLogo;
