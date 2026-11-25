import { MessageCircle } from 'lucide-react';
import { BullionRates, CollectionCategory, JewelleryItem, PageRoute } from '../types';
import { formatInr } from '../hooks/useBullionRates';

interface WhatsAppFloatButtonProps {
  currentPage: PageRoute;
  activeCategory: CollectionCategory;
  activeItem: JewelleryItem | null;
  preselectedItem: string;
  rates: BullionRates | null;
}

const WHATSAPP_NUMBER = '916304375143';

const CATEGORY_TITLES: Record<CollectionCategory, string> = {
  all: 'Jewellery Collection',
  'gold-earrings': '22K Gold Jhumkas & Chandbalis',
  'temple-bridal': '22K Temple & Bridal Jewellery',
  'bangles-kadas': '22K Nakshi Bangles & Kadas',
  'bullion-coins': '24K Bullion & Bespoke Manufacturing',
  'silver-articles': '999 Fine Silver Articles',
};

function buildContextMessage({
  currentPage,
  activeCategory,
  activeItem,
  preselectedItem,
  rates,
}: WhatsAppFloatButtonProps): string {
  if (activeItem) {
    return `Namaste SATYAM SHIVAM JEWELLERY, I would like to order ${activeItem.name} (${activeItem.sku}, ${activeItem.purity}, Weight: ${activeItem.weightRange}). Please share wholesale details.`;
  }

  switch (currentPage) {
    case 'collection':
      return `Namaste SATYAM SHIVAM JEWELLERY, I am browsing your ${CATEGORY_TITLES[activeCategory]} and would like to place a wholesale order.`;

    case 'rates':
      if (rates) {
        return `Namaste SATYAM SHIVAM JEWELLERY, I saw today's rates (24K Gold: ${formatInr(
          rates.gold24kPer10g
        )}/10g, 22K Gold: ${formatInr(
          rates.gold22kPer10g
        )}/10g, 999 Silver: ${formatInr(
          rates.silverPerKg
        )}/kg; GST added later) and would like to place an order.`;
      }
      return `Namaste SATYAM SHIVAM JEWELLERY, I am on your Live Rates page and would like to inquire about today's wholesale gold and silver order booking.`;

    case 'about':
      return `Namaste SATYAM SHIVAM JEWELLERY, I read about your Nellore manufacturing factory (Est. 1997) and would like to connect for pan-India wholesale supply.`;

    case 'location':
      return `Namaste SATYAM SHIVAM JEWELLERY, I would like to visit your Chinna Bazar, Nellore showroom to review samples and place a wholesale order.`;

    case 'contact':
      if (preselectedItem) {
        return `Namaste SATYAM SHIVAM JEWELLERY, I would like to place a wholesale order for ${preselectedItem}.`;
      }
      return `Namaste SATYAM SHIVAM JEWELLERY, I would like to connect with your wholesale desk to place an order.`;

    case 'home':
    default:
      return `Namaste SATYAM SHIVAM JEWELLERY, I visited your website and would like to place a wholesale gold & silver jewellery order.`;
  }
}

export function WhatsAppFloatButton(props: WhatsAppFloatButtonProps) {
  const message = buildContextMessage(props);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const contextTitle = props.activeItem
    ? `Order ${props.activeItem.name} on WhatsApp`
    : 'Order on WhatsApp (+91 6304375143)';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contextTitle}
      title={contextTitle}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] inline-flex items-center gap-2.5 h-11 px-4 sm:px-5 bg-[#4A0D1C] border border-[#D4AF37]/65 text-[#F5E3B3] text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 shadow-[0_14px_32px_rgba(18,14,16,0.35)] hover:bg-[#631326] hover:border-[#E2C16B] hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C2E]"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span>Order on WhatsApp</span>
    </a>
  );
}
