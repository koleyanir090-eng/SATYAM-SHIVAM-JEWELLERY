import { PageRoute } from '../types';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

const PILLARS = [
  {
    index: '01',
    title: 'In-House Manufacturing Since 1997',
    detail:
      'Founded in 1997 in Chinna Bazar, Nellore, our integrated production unit controls every stage from 24K bullion melting and alloy calibration to Nakshi embossing and mirror polishing.',
  },
  {
    index: '02',
    title: 'All-India Wholesale Network',
    detail:
      'We supply independent retail showrooms, bridal boutiques, and regional bullion houses across Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Maharashtra, and beyond.',
  },
  {
    index: '03',
    title: '916 BIS Hallmarking & Assay Discipline',
    detail:
      'Every 22K gold batch undergoes XRF purity verification and BIS HUID hallmarking, while our fine silver vessels and anklets maintain guaranteed 999 purity.',
  },
  {
    index: '04',
    title: 'Bespoke Weight Brackets & Custom Dies',
    detail:
      'Retail partners can commission custom weight ranges for regional bridal preferences with consistent finish, competitive factory making charges, and transparent billing.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Page Header */}
      <section className="bg-[#120E10] text-[#FAF7F2] border-b border-[#D4AF37]/20 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E2C16B] mb-3">
            Heritage &amp; Manufacturing · Since 1997
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2] max-w-3xl [text-wrap:balance] mb-5">
            Nearly Three Decades of Pure Gold &amp; Silver Mastery
          </h1>
          <p className="text-base sm:text-lg text-[#CBBFB4] max-w-2xl leading-relaxed">
            SATYAM SHIVAM JEWELLERY began as a dedicated goldsmithing house in Nellore’s historic Chinna Bazar bullion quarter. Today, our own manufacturing factory powers wholesale jewellery partners across every corner of India.
          </p>
        </div>
      </section>

      {/* Split Factory Story */}
      <section className="py-16 lg:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#120E10] shadow-[0_20px_50px_-18px_rgba(24,19,21,0.22)]">
                <SafeImage
                  src="/src/assets/images/craftsmanship_atelier_1795639693865.jpg"
                  alt="Artisanal goldsmith bench at SATYAM SHIVAM JEWELLERY factory in Nellore"
                  className="w-full h-full object-cover"
                  fallbackTitle="Master Karigar Bench"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181315] leading-tight">
                Why Showrooms Partner Directly With Our Factory
              </h2>
              <p className="text-sm sm:text-base text-[#5E534E] leading-relaxed">
                Traditional jewellery supply chains pass ornaments through multiple regional brokers before reaching a showroom tray. By manufacturing directly inside our Nellore facility, we eliminate layered commissions and guarantee uniformity across repeat bridal orders.
              </p>
              <p className="text-sm sm:text-base text-[#5E534E] leading-relaxed">
                Whether you require heavy Ashtalakshmi temple harams, precision die-struck Kasu Malas, screw-clasp Nakshi kadas, or 999 silver pooja ware, our production floor balances traditional hand-crafting with dependable dispatch timelines.
              </p>

              <div className="pt-4 border-t border-[#181315]/12 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="px-6 py-3.5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] transition-colors cursor-pointer"
                >
                  Browse Wholesale Catalog
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 border border-[#181315]/25 text-[#181315] text-xs font-semibold tracking-[0.08em] uppercase hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors cursor-pointer"
                >
                  Open a Wholesale Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Manufacturing Pillars */}
      <section className="py-16 lg:py-20 bg-[#F2ECE2] border-t border-[#181315]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C2E] mb-2">
              Factory Standards
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181315]">
              Built on Purity, Precision &amp; Long-Term Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-white border border-[#181315]/8 shadow-[0_10px_28px_-14px_rgba(24,19,21,0.08)] p-8 space-y-3"
              >
                <p className="font-mono-tabular text-xs font-semibold text-[#A67C2E]">
                  {pillar.index}.
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#181315]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5E534E] leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
