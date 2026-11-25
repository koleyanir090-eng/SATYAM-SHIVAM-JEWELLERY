import type { Timestamp } from 'firebase/firestore';

export type PageRoute = 'home' | 'about' | 'collection' | 'rates' | 'location' | 'contact';

export interface BullionRates {
  gold24kPer10g: number;
  gold22kPer10g: number;
  silverPerKg: number;
  silverPer10g: number;
  gstNote: string;
  marketNote?: string;
  updatedByLabel: string;
  updatedAt: Timestamp | null;
}

export interface RateHistoryEntry {
  id: string;
  gold24kPer10g: number;
  gold22kPer10g: number;
  silverPerKg: number;
  silverPer10g: number;
  marketNote?: string;
  updatedByUid: string;
  updatedAt: Timestamp | null;
}

export type CollectionCategory =
  | 'all'
  | 'gold-earrings'
  | 'temple-bridal'
  | 'bangles-kadas'
  | 'bullion-coins'
  | 'silver-articles';

export interface JewelleryItem {
  id: string;
  sku: string;
  name: string;
  category: Exclude<CollectionCategory, 'all'>;
  categoryLabel: string;
  purity: string;
  weightRange: string;
  moq: string;
  craftsmanship: string;
  description: string;
  image: string;
  imageAlt: string;
}
