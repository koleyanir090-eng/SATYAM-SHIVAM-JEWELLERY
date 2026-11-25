import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'collection', label: 'Collection' },
  { id: 'rates', label: 'Live Rates' },
  { id: 'location', label: 'Location' },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#181315]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark + SS Swastik Crest */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0D1C] cursor-pointer"
        >
          <BrandLogo size={40} className="shrink-0" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.09em] text-[#181315] whitespace-nowrap shrink-0">
            SATYAM SHIVAM JEWELLERY
          </span>
        </button>

        {/* Zone 2: 5 Clean Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1.5 text-[13px] tracking-[0.04em] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0D1C] ${
                  isActive
                    ? 'text-[#4A0D1C] font-semibold'
                    : 'text-[#5E534E] hover:text-[#181315]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] transition-opacity duration-150 bg-[#A67C2E] ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C2E] ${
              currentPage === 'contact'
                ? 'bg-[#631326] text-[#F5E3B3]'
                : 'bg-[#4A0D1C] text-[#FAF7F2] hover:bg-[#631326] hover:text-[#F5E3B3]'
            }`}
          >
            Contact Us
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#181315] border border-[#181315]/15 bg-white hover:bg-[#F2ECE2] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0D1C]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#181315]/10 px-4 py-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#4A0D1C] text-[#F5E3B3]'
                    : 'text-[#181315] hover:bg-[#F2ECE2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-[#631326] text-[#F5E3B3]'
                : 'bg-[#120E10] text-[#FAF7F2]'
            }`}
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
