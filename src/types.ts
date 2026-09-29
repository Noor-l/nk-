export type Language = 'ur' | 'en';

export type CurrencyCode = 'PKR' | 'USD' | 'SAR' | 'AED' | 'INR' | 'GBP' | 'EUR';

export type NisabStandard = 'silver' | 'gold';

export interface CurrencyConfig {
  code: CurrencyCode;
  nameEn: string;
  nameUr: string;
  symbol: string;
  defaultGoldPerGram: number;
  defaultSilverPerGram: number;
  defaultGoldPerTola: number;
  defaultSilverPerTola: number;
}

export interface ZakatAssets {
  // Cash & Bank
  cashInHand: number;
  cashInBank: number;
  foreignCurrency: number;
  goodDebtsReceivable: number; // money owed to you expected to return

  // Metals
  goldGrams: number;
  goldValueDirect: number;
  silverGrams: number;
  silverValueDirect: number;

  // Business
  businessInventory: number;
  tradeReceivables: number;
  rawMaterials: number;

  // Investments
  sharesAndStocks: number;
  mutualFundsCrypto: number;
  prizeBondsCertificates: number;
  accessibleProvidentFund: number;

  // Property
  plotForResale: number; // purchased specifically to resell
  accruedRentalSavings: number;
}

export interface ZakatLiabilities {
  shortTermDebtsDue: number; // loans due immediately/within 1 lunar year
  unpaidBillsAndRent: number; // pending utility, rent, tax
  supplierPayables: number; // trade supplier debts
  immediateLivingExpenses: number; // immediate basic family expenses for the month
}

export interface NisabSettings {
  standard: NisabStandard;
  goldRatePerGram: number;
  silverRatePerGram: number;
  unit: 'gram' | 'tola';
}

export interface ZakatResult {
  totalAssets: number;
  totalLiabilities: number;
  netZakatableWealth: number;
  nisabThreshold: number;
  isEligibleToPay: boolean;
  zakatDue: number; // 2.5% of net wealth
}
