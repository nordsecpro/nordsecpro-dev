// Cypentra Logo Component
function CypentraLogo({ className = 'h-8 w-auto' }) {
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

export default CypentraLogo;
