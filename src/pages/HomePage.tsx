import { ArrowRight } from 'lucide-react';
import { BullionRates, CollectionCategory, JewelleryItem, PageRoute } from '../types';
import { JEWELLERY_CATALOG } from '../data/catalog';
import { formatInr, formatIstDateTime } from '../hooks/useBullionRates';
import { BrandLogo } from '../components/BrandLogo';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  rates: BullionRates | null;
  ratesLoading: boolean;
  onNavigate: (page: PageRoute) => void;
  onInquireItem: (itemName: string) => void;
  onSelectCollectionItem: (item: JewelleryItem) => void;
  onExploreCategory: (category: CollectionCategory) => void;
}

export function HomePage({
  rates,
  ratesLoading,
  onNavigate,
  onInquireItem,
  onSelectCollectionItem,
  onExploreCategory,
}: HomePageProps) {
  const heroPiece = JEWELLERY_CATALOG[6]; // Ashtalakshmi Temple Bridal Haram & Jhumka Set
  const spotlightPiece = JEWELLERY_CATALOG[7]; // Heritage Kasu Mala & Nakshi Peacock Choker

  const featuredItems = [
    JEWELLERY_CATALOG[1], // Ashtalakshmi Emerald & Peacock Temple Jhumkas
    JEWELLERY_CATALOG[4], // Emerald Crescent Filigree Gold Chandbalis
    JEWELLERY_CATALOG[0], // Ruby & Pearl-Dome 22K Gold Jhumkas
    JEWELLERY_CATALOG[3], // Kempu Ruby-Fringe Bridal Lakshmi Jhumkas
    JEWELLERY_CATALOG[8], // Royal Nakshi Screw-Clasp Bridal Kadas
    JEWELLERY_CATALOG[11], // 999 Fine Silver Pooja Kalash, Deepam & Payal Set
  ];

  const updatedLabel = rates?.updatedAt
    ? formatIstDateTime(rates.updatedAt.toDate())
    : ratesLoading
      ? 'Syncing live desk...'
      : 'Awaiting today’s desk update';

  return (
    <div>
      {/* Section 1: High-Contrast Obsidian & Royal Burgundy Editorial Hero */}
      <section className="relative bg-[#120E10] text-[#FAF7F2] overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 -left-24 w-[520px] h-[520px] rounded-full bg-[#4A0D1C]/45 blur-[130px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Editorial Copy (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <BrandLogo size={38} className="shrink-0" />
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#E2C16B]">
                  Own Manufacturing Factory · Since 1997
                </p>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.5rem] font-semibold tracking-tight text-[#FAF7F2] leading-[1.06] [text-wrap:balance]">
                Pure Heritage Gold, Forged for India’s Finest Showrooms
              </h1>

              <p className="text-base text-[#CBBFB4] leading-relaxed max-w-md">
                From our Chinna Bazar atelier in Nellore, SATYAM SHIVAM JEWELLERY supplies 24K bullion, 22K BIS 916 temple ornaments, and 999 fine silver with factory-direct precision.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E2C16B] text-[#120E10] text-xs font-bold tracking-[0.12em] uppercase hover:bg-[#F0D68A] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2C16B]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('rates')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#4A0D1C] border border-[#D4AF37]/45 text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2C16B]"
                >
                  <span>Live Bullion Rates</span>
                </button>
              </div>
            </div>

            {/* Prominent Unencumbered Hero Product Stage (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#1A1416] border border-[#D4AF37]/25 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)]">
                <button
                  type="button"
                  onClick={() => onSelectCollectionItem(heroPiece)}
                  className="block w-full aspect-[16/9] overflow-hidden bg-[#0D0A0B] cursor-pointer text-left group"
                >
                  <SafeImage
                    src="/src/assets/images/hero_temple_gold_1795639693898.jpg"
                    alt="SATYAM SHIVAM JEWELLERY 22K gold bridal temple haram necklace and jhumka earrings on royal burgundy velvet"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    fallbackTitle="22K Temple Bridal Craftsmanship"
                  />
                </button>
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#D4AF37]/15">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#E2C16B]">
                      Signature Bridal Masterpiece · 22K 916 BIS
                    </p>
                    <p className="font-display text-lg text-[#FAF7F2]">
                      Ashtalakshmi Temple Bridal Haram &amp; Kemp Jhumka Set
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectCollectionItem(heroPiece)}
                    className="text-xs font-semibold tracking-[0.08em] uppercase text-[#E2C16B] hover:text-[#FAF7F2] transition-colors whitespace-nowrap cursor-pointer text-left"
                  >
                    Inspect Piece &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sleek Architectural Live Bullion Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#FAF7F2]/12 bg-[#171214] divide-y sm:divide-y-0 sm:divide-x divide-[#FAF7F2]/10">
            <div className="p-5 sm:px-6 sm:py-5">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#A89B8F] mb-1">
                24K Gold · 999 Purity (10g)
              </p>
              <p className="font-mono-tabular text-2xl font-medium text-[#E2C16B]">
                {rates ? formatInr(rates.gold24kPer10g) : '—'}
              </p>
              <p className="text-xs text-[#8E8073] mt-1">GST will be added later</p>
            </div>

            <div className="p-5 sm:px-6 sm:py-5">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#A89B8F] mb-1">
                22K Gold · 916 BIS (10g)
              </p>
              <p className="font-mono-tabular text-2xl font-medium text-[#E2C16B]">
                {rates ? formatInr(rates.gold22kPer10g) : '—'}
              </p>
              <p className="text-xs text-[#8E8073] mt-1">Wholesale ornament benchmark</p>
            </div>

            <div className="p-5 sm:px-6 sm:py-5">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#A89B8F] mb-1">
                999 Fine Silver (1 Kg)
              </p>
              <p className="font-mono-tabular text-2xl font-medium text-[#FAF7F2]">
                {rates ? formatInr(rates.silverPerKg) : '—'}
              </p>
              <p className="text-xs text-[#8E8073] mt-1">
                {rates ? `${formatInr(rates.silverPer10g)} / 10g` : 'Pooja & payal grade'}
              </p>
            </div>

            <div className="p-5 sm:px-6 sm:py-5 flex flex-col justify-between bg-[#4A0D1C]">
              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-[#E2C16B] mb-1">
                  Desk Timestamp
                </p>
                <p className="font-mono-tabular text-sm text-[#FAF7F2]">{updatedLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('rates')}
                className="mt-3 text-left text-xs font-semibold tracking-wide text-[#E2C16B] hover:text-white transition-colors cursor-pointer"
              >
                Live Rate Board &amp; Owner Desk &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Prominent Product Showcase on Alabaster Silk */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C2E] mb-2">
                Curated Wholesale Showcase
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#181315] [text-wrap:balance]">
                Signature Gold &amp; Silver Creations
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-[0.08em] uppercase">
              <button
                type="button"
                onClick={() => onExploreCategory('gold-earrings')}
                className="text-[#4A0D1C] hover:text-[#A67C2E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                22K Jhumkas &amp; Chandbalis &rarr;
              </button>
              <button
                type="button"
                onClick={() => onExploreCategory('all')}
                className="text-[#181315] hover:text-[#4A0D1C] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
              >
                View Full Catalog
              </button>
            </div>
          </div>

          {/* Flagship Horizontal Product Plinth */}
          <article className="mb-12 bg-white border border-[#181315]/10 shadow-[0_18px_48px_-18px_rgba(24,19,21,0.14)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            <button
              type="button"
              onClick={() => onSelectCollectionItem(spotlightPiece)}
              className="lg:col-span-7 aspect-[4/3] overflow-hidden bg-[#120E10] cursor-pointer group text-left"
            >
              <SafeImage
                src={spotlightPiece.image}
                alt={spotlightPiece.imageAlt}
                className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
                fallbackTitle={spotlightPiece.name}
              />
            </button>

            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A67C2E]">
                  {spotlightPiece.categoryLabel} &middot; {spotlightPiece.sku}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#181315] leading-[1.12] [text-wrap:balance]">
                  {spotlightPiece.name}
                </h3>
                <p className="text-sm sm:text-base text-[#5E534E] leading-relaxed">
                  {spotlightPiece.description}
                </p>

                <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-[#181315]/10 text-xs">
                  <div>
                    <dt className="text-[#857972] uppercase tracking-wider mb-1">Purity</dt>
                    <dd className="font-semibold text-[#4A0D1C]">{spotlightPiece.purity}</dd>
                  </div>
                  <div>
                    <dt className="text-[#857972] uppercase tracking-wider mb-1">Weight Bracket</dt>
                    <dd className="font-mono-tabular font-medium text-[#181315]">
                      {spotlightPiece.weightRange}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onInquireItem(`${spotlightPiece.name} (${spotlightPiece.sku})`)}
                  className="px-6 py-3 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] transition-colors cursor-pointer"
                >
                  Request Wholesale Quote
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCollectionItem(spotlightPiece)}
                  className="px-6 py-3 border border-[#181315]/20 text-[#181315] text-xs font-semibold tracking-[0.08em] uppercase hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors cursor-pointer"
                >
                  Full Specifications
                </button>
              </div>
            </div>
          </article>

          {/* 3-Column Prominent Jewelry Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-[#181315]/8 shadow-[0_10px_30px_-14px_rgba(24,19,21,0.10)] hover:shadow-[0_22px_48px_-16px_rgba(24,19,21,0.18)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => onSelectCollectionItem(item)}
                  className="aspect-[4/3] overflow-hidden bg-[#120E10] cursor-pointer text-left"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                    fallbackTitle={item.name}
                  />
                </button>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#857972] mb-1.5">
                      {item.categoryLabel} &middot;{' '}
                      <span className="text-[#A67C2E]">{item.purity}</span>
                    </p>
                    <h3 className="font-display text-[22px] leading-snug font-semibold text-[#181315]">
                      <button
                        type="button"
                        onClick={() => onSelectCollectionItem(item)}
                        className="text-left hover:text-[#4A0D1C] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </h3>
                  </div>

                  <div className="pt-3.5 border-t border-[#181315]/10 flex items-center justify-between text-xs">
                    <span className="font-mono-tabular text-[#5E534E]">
                      Wt: {item.weightRange}
                    </span>
                    <button
                      type="button"
                      onClick={() => onInquireItem(`${item.name} (${item.sku})`)}
                      className="font-semibold tracking-[0.06em] uppercase text-[#4A0D1C] hover:text-[#A67C2E] transition-colors cursor-pointer"
                    >
                      Inquire &rarr;
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Direct-From-Factory Atelier Heritage */}
      <section className="py-16 lg:py-24 bg-[#F2ECE2] border-t border-[#181315]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] overflow-hidden bg-[#120E10] shadow-[0_20px_50px_-18px_rgba(24,19,21,0.22)]">
                <SafeImage
                  src="/src/assets/images/craftsmanship_atelier_1795639693865.jpg"
                  alt="Master karigar artisans crafting 22K gold ornaments inside the Satyam Shivam Jewellery factory"
                  className="w-full h-full object-cover"
                  fallbackTitle="Nellore Manufacturing Factory Since 1997"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C2E]">
                Est. 1997 · Chinna Bazar, Nellore
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181315] leading-[1.12] [text-wrap:balance]">
                Direct From Our Manufacturing Bench to Showrooms Across India
              </h2>
              <p className="text-base text-[#5E534E] leading-relaxed">
                Every ornament leaves our Nellore foundry after multi-stage XRF purity assaying, hand-finishing by master karigars, and strict weight calibration—giving retail jewellery partners factory-direct margins without intermediaries.
              </p>

              <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#181315]/12">
                <div>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-medium text-[#4A0D1C]">
                    29+ Yrs
                  </p>
                  <p className="text-xs text-[#5E534E] mt-1">Manufacturing Legacy</p>
                </div>
                <div>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-medium text-[#4A0D1C]">
                    916 / 999
                  </p>
                  <p className="text-xs text-[#5E534E] mt-1">BIS Hallmarked Purity</p>
                </div>
                <div>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-medium text-[#4A0D1C]">
                    All India
                  </p>
                  <p className="text-xs text-[#5E534E] mt-1">Insured Supply</p>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] transition-colors cursor-pointer"
                >
                  Read Our Story
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('location')}
                  className="px-6 py-3.5 border border-[#181315]/25 text-[#181315] text-xs font-semibold tracking-[0.08em] uppercase hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors cursor-pointer"
                >
                  Visit Nellore Showroom
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
