interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className = '', size = 44 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ssj-gold-grad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8E39A" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7421" />
        </linearGradient>
        <linearGradient id="ssj-burgundy-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A0E1C" />
          <stop offset="100%" stopColor="#1B050B" />
        </linearGradient>
      </defs>

      {/* Royal Octagonal Crest */}
      <polygon
        points="60,4 99,21 116,60 99,99 60,116 21,99 4,60 21,21"
        fill="url(#ssj-burgundy-bg)"
        stroke="url(#ssj-gold-grad)"
        strokeWidth="2.5"
      />
      <polygon
        points="60,11 94,26 109,60 94,94 60,109 26,94 11,60 26,26"
        fill="none"
        stroke="url(#ssj-gold-grad)"
        strokeWidth="0.9"
        strokeOpacity="0.65"
      />

      {/* Sacred Traditional Hindu Swastik Centered in Upper Crest */}
      <g stroke="url(#ssj-gold-grad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Vertical stem */}
        <line x1="60" y1="22" x2="60" y2="48" />
        {/* Horizontal crossbar */}
        <line x1="47" y1="35" x2="73" y2="35" />
        {/* Top arm turning right */}
        <line x1="60" y1="22" x2="70" y2="22" />
        {/* Right arm turning down */}
        <line x1="73" y1="35" x2="73" y2="45" />
        {/* Bottom arm turning left */}
        <line x1="60" y1="48" x2="50" y2="48" />
        {/* Left arm turning up */}
        <line x1="47" y1="35" x2="47" y2="25" />
      </g>
      {/* Four Auspicious Bindus */}
      <circle cx="53.5" cy="28.5" r="1.4" fill="url(#ssj-gold-grad)" />
      <circle cx="66.5" cy="28.5" r="1.4" fill="url(#ssj-gold-grad)" />
      <circle cx="53.5" cy="41.5" r="1.4" fill="url(#ssj-gold-grad)" />
      <circle cx="66.5" cy="41.5" r="1.4" fill="url(#ssj-gold-grad)" />

      {/* Subtle Divider Line */}
      <line
        x1="34"
        y1="56"
        x2="86"
        y2="56"
        stroke="url(#ssj-gold-grad)"
        strokeWidth="1"
        strokeOpacity="0.7"
      />

      {/* Intertwined Regal SS Monogram */}
      <text
        x="60"
        y="91"
        textAnchor="middle"
        fill="url(#ssj-gold-grad)"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="3"
      >
        SS
      </text>
    </svg>
  );
}
