import { PageRoute } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#120E10] border-t border-[#D4AF37]/20 text-[#D6CBBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <BrandLogo size={44} className="shrink-0" />
              <div>
                <h2 className="font-display text-xl font-bold tracking-[0.07em] text-[#E2C16B]">
                  SATYAM SHIVAM JEWELLERY
                </h2>
                <p className="text-xs text-[#A89B8F]">
                  Own Manufacturing Factory · All-India Wholesale Supplier Since 1997
                </p>
              </div>
            </div>
            <p className="text-sm text-[#B8A99A] leading-relaxed max-w-md">
              Direct-from-foundry 24K bullion, 22K BIS 916 hallmarked temple ornaments, and 999 fine silver articles crafted in Nellore for retail jewellers nationwide.
            </p>
            <p className="text-xs text-[#E2C16B]/90">
              Billing Notice: Wholesale bullion rates exclude GST. GST will be added later at final billing.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="font-display text-lg font-semibold text-[#FAF7F2]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  ['home', 'Home'],
                  ['about', 'About Us & Factory'],
                  ['collection', 'Jewellery Collection'],
                  ['rates', '24K, 22K & Silver Rates'],
                  ['location', 'Google Maps Location'],
                  ['contact', 'Wholesale Contact'],
                ] as [PageRoute, string][]
              ).map(([route, label]) => (
                <li key={route}>
                  <button
                    type="button"
                    onClick={() => onNavigate(route)}
                    className="text-[#B8A99A] hover:text-[#E2C16B] transition-colors cursor-pointer text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Direct Contact */}
          <div className="md:col-span-4 space-y-3.5">
            <h3 className="font-display text-lg font-semibold text-[#FAF7F2]">
              Wholesale Showroom &amp; Factory
            </h3>
            <div className="space-y-2.5 text-sm text-[#B8A99A]">
              <p>Chinna Bazar, Nellore, Andhra Pradesh 524001, India</p>
              <p>
                Office &amp; WhatsApp:{' '}
                <a
                  href="tel:+916304375143"
                  className="text-[#E2C16B] hover:underline font-mono-tabular"
                >
                  +91 6304375143
                </a>
              </p>
              <p>
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/satyamshivamjewellery143/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2C16B] hover:underline"
                >
                  @satyamshivamjewellery143
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8073]">
          <p>
            &copy; {new Date().getFullYear()} SATYAM SHIVAM JEWELLERY. All rights reserved.
          </p>
          <p>Chinna Bazar, Nellore · Serving Pan-India Wholesale Partners Since 1997</p>
        </div>
      </div>
    </footer>
  );
}
