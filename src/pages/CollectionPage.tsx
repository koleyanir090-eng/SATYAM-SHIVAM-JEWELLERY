import { X, MessageCircle } from 'lucide-react';
import { JEWELLERY_CATALOG } from '../data/catalog';
import { CollectionCategory, JewelleryItem } from '../types';
import { SafeImage } from '../components/SafeImage';

interface CollectionPageProps {
  activeCategory: CollectionCategory;
  onCategoryChange: (category: CollectionCategory) => void;
  selectedItem: JewelleryItem | null;
  onSelectItem: (item: JewelleryItem | null) => void;
  onInquireItem: (itemName: string) => void;
}

const CATEGORIES: { id: CollectionCategory; label: string }[] = [
  { id: 'all', label: 'All Pieces' },
  { id: 'gold-earrings', label: 'Gold Jhumkas & Chandbalis' },
  { id: 'temple-bridal', label: '22K Temple & Bridal' },
  { id: 'bangles-kadas', label: 'Bangles & Kadas' },
  { id: 'bullion-coins', label: '24K Bullion & Bespoke' },
  { id: 'silver-articles', label: '999 Silver Articles' },
];

export function CollectionPage({
  activeCategory,
  onCategoryChange,
  selectedItem,
  onSelectItem,
  onInquireItem,
}: CollectionPageProps) {
  const filteredItems =
    activeCategory === 'all'
      ? JEWELLERY_CATALOG
      : JEWELLERY_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Page Header */}
      <section className="bg-[#120E10] text-[#FAF7F2] border-b border-[#D4AF37]/20 py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E2C16B] mb-3">
                Wholesale Catalog · Direct From Factory
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2] [text-wrap:balance] mb-4">
                Jewellery Collection
              </h1>
              <p className="text-base text-[#CBBFB4] max-w-2xl leading-relaxed">
                Explore our signature wholesale lines crafted in 22K 916 BIS hallmarked gold, 24K bullion, and 999 fine silver. Custom weight brackets and showroom lot pricing available on inquiry.
              </p>
            </div>

            <p className="text-xs text-[#B8A99A] shrink-0">
              Latest factory drops:{' '}
              <a
                href="https://www.instagram.com/satyamshivamjewellery143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E2C16B] hover:underline font-medium"
              >
                @satyamshivamjewellery143
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Filter Toolbar + Prominent 3-Column Gallery */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#181315]/10">
            <div
              className="inline-flex flex-wrap items-center gap-1.5 bg-white border border-[#181315]/10 p-1.5 shadow-sm"
              role="tablist"
              aria-label="Jewellery categories"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0D1C] ${
                      isSelected
                        ? 'bg-[#4A0D1C] text-[#FAF7F2]'
                        : 'text-[#5E534E] hover:text-[#181315] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono-tabular text-xs text-[#5E534E] shrink-0">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'Creation' : 'Creations'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-[#181315]/8 shadow-[0_10px_30px_-14px_rgba(24,19,21,0.10)] hover:shadow-[0_22px_48px_-16px_rgba(24,19,21,0.18)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="aspect-[4/3] overflow-hidden bg-[#120E10] cursor-pointer text-left"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                    fallbackTitle={item.name}
                  />
                </button>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#857972] mb-2">
                      {item.sku} &middot;{' '}
                      <span className="text-[#A67C2E]">{item.purity}</span>
                    </p>
                    <h2 className="font-display text-[22px] leading-snug font-semibold text-[#181315] mb-2">
                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        className="text-left hover:text-[#4A0D1C] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </h2>
                    <p className="text-sm text-[#5E534E] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#181315]/10 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-[#5E534E]">
                      <span className="font-mono-tabular font-medium text-[#181315]">
                        Wt: {item.weightRange}
                      </span>
                      <span>{item.moq}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        className="flex-1 py-2.5 px-3 text-xs font-semibold tracking-[0.06em] uppercase border border-[#181315]/20 text-[#181315] hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Specifications
                      </button>
                      <button
                        type="button"
                        onClick={() => onInquireItem(`${item.name} (${item.sku})`)}
                        className="flex-1 py-2.5 px-3 text-xs font-semibold tracking-[0.06em] uppercase bg-[#4A0D1C] text-[#FAF7F2] hover:bg-[#631326] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Wholesale Quote
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Product Specification Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#120E10]/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-item-title"
        >
          <div className="max-w-4xl w-full bg-[#FAF7F2] border border-[#181315]/15 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6 bg-[#120E10] flex items-center justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={selectedItem.image}
                  alt={selectedItem.imageAlt}
                  className="w-full h-full object-cover"
                  fallbackTitle={selectedItem.name}
                />
              </div>
            </div>

            <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between space-y-6 bg-white">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#A67C2E]">
                    {selectedItem.sku} &middot; {selectedItem.categoryLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectItem(null)}
                    className="p-1.5 text-[#5E534E] hover:text-[#181315] border border-[#181315]/15 cursor-pointer"
                    aria-label="Close specifications"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="modal-item-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#181315] leading-tight mb-3"
                >
                  {selectedItem.name}
                </h3>
                <p className="text-sm text-[#5E534E] leading-relaxed mb-5">
                  {selectedItem.description}
                </p>

                <dl className="space-y-3 text-xs border-t border-[#181315]/10 pt-4">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#857972]">Purity Standard</dt>
                    <dd className="text-[#4A0D1C] font-semibold text-right">
                      {selectedItem.purity}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#857972]">Weight Range</dt>
                    <dd className="font-mono-tabular font-medium text-[#181315] text-right">
                      {selectedItem.weightRange}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#857972]">Wholesale MOQ</dt>
                    <dd className="text-[#181315] text-right">{selectedItem.moq}</dd>
                  </div>
                  <div className="pt-2 border-t border-[#181315]/8">
                    <dt className="text-[#857972] mb-1">Craftsmanship</dt>
                    <dd className="text-[#5E534E] leading-relaxed">{selectedItem.craftsmanship}</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-4 border-t border-[#181315]/10 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const label = `${selectedItem.name} (${selectedItem.sku})`;
                    onSelectItem(null);
                    onInquireItem(label);
                  }}
                  className="flex-1 py-3 px-4 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#631326] transition-colors cursor-pointer text-center"
                >
                  Request Wholesale Quote
                </button>
                <a
                  href={`https://wa.me/916304375143?text=${encodeURIComponent(
                    `Namaste SATYAM SHIVAM JEWELLERY, I would like wholesale details for ${selectedItem.name} (${selectedItem.sku}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-[#181315]/20 text-[#181315] text-xs font-semibold tracking-[0.06em] uppercase hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
