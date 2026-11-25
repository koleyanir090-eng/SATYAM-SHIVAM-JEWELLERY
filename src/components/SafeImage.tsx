import { useState } from 'react';
import { BrandLogo } from './BrandLogo';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'SATYAM SHIVAM JEWELLERY',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2C0811] via-[#161013] to-[#120E10] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BrandLogo size={52} className="mb-3 opacity-90" />
        <span className="font-display text-sm tracking-wide text-[#E2C16B]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
