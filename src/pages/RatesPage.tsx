import { FormEvent, useEffect, useState } from 'react';
import { Lock, LogIn, LogOut, CheckCircle2, AlertCircle, Calculator } from 'lucide-react';
import { BullionRates, RateHistoryEntry } from '../types';
import { UpdateRatesInput, formatInr, formatIstDateTime } from '../hooks/useBullionRates';
import { User } from 'firebase/auth';

interface RatesPageProps {
  rates: BullionRates | null;
  ratesLoading: boolean;
  ratesError: string | null;
  user: User | null;
  authReady: boolean;
  isOwner: boolean;
  history: RateHistoryEntry[];
  saving: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onPublishRates: (input: UpdateRatesInput) => Promise<void>;
}

export function RatesPage({
  rates,
  ratesLoading,
  ratesError,
  user,
  authReady,
  isOwner,
  history,
  saving,
  onSignIn,
  onSignOut,
  onPublishRates,
}: RatesPageProps) {
  // Interactive Weight & Metal Value Estimator state
  const [calcMetal, setCalcMetal] = useState<'24k' | '22k' | 'silver'>('22k');
  const [calcGrams, setCalcGrams] = useState<string>('50');

  // Owner manual rate management form state
  const [gold24kInput, setGold24kInput] = useState('78500');
  const [gold22kInput, setGold22kInput] = useState('71960');
  const [silverKgInput, setSilverKgInput] = useState('92500');
  const [silver10gInput, setSilver10gInput] = useState('925');
  const [gstNoteInput, setGstNoteInput] = useState('GST will be added later.');
  const [marketNoteInput, setMarketNoteInput] = useState('');
  const [updatedByLabelInput, setUpdatedByLabelInput] = useState('Owner Desk');
  const [formFeedback, setFormFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);

  // Sync form inputs when live rates load
  useEffect(() => {
    if (rates) {
      setGold24kInput(String(rates.gold24kPer10g));
      setGold22kInput(String(rates.gold22kPer10g));
      setSilverKgInput(String(rates.silverPerKg));
      setSilver10gInput(String(rates.silverPer10g));
      setGstNoteInput(rates.gstNote || 'GST will be added later.');
      setMarketNoteInput(rates.marketNote || '');
      setUpdatedByLabelInput(rates.updatedByLabel || 'Owner Desk');
    }
  }, [rates]);

  const handleSilverKgChange = (value: string) => {
    setSilverKgInput(value);
    const num = Number(value);
    if (Number.isFinite(num) && num > 0) {
      setSilver10gInput(String(Math.round(num / 100)));
    }
  };

  const handleSubmitRates = async (e: FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);
    try {
      await onPublishRates({
        gold24kPer10g: Number(gold24kInput),
        gold22kPer10g: Number(gold22kInput),
        silverPerKg: Number(silverKgInput),
        silverPer10g: Number(silver10gInput),
        gstNote: gstNoteInput,
        marketNote: marketNoteInput,
        updatedByLabel: updatedByLabelInput,
      });
      setFormFeedback({
        type: 'success',
        message: 'Live wholesale bullion rates and timestamp updated across the website.',
      });
    } catch (err) {
      let friendly = 'Could not publish rates. Please check inputs.';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message) as { error?: string };
          friendly = parsed.error || err.message;
        } catch {
          friendly = err.message;
        }
      }
      setFormFeedback({
        type: 'error',
        message: friendly,
      });
    }
  };

  const handleSignInClick = async () => {
    setAuthFeedback(null);
    try {
      await onSignIn();
    } catch (err) {
      setAuthFeedback(
        err instanceof Error ? err.message : 'Sign-in could not be completed. Please try again.'
      );
    }
  };

  // Compute estimator preview
  const gramsNum = Math.max(0, Number(calcGrams) || 0);
  const activeRatePerGram = rates
    ? calcMetal === '24k'
      ? rates.gold24kPer10g / 10
      : calcMetal === '22k'
        ? rates.gold22kPer10g / 10
        : rates.silverPer10g / 10
    : 0;
  const estimatedValue = Math.round(gramsNum * activeRatePerGram);

  const lastUpdatedText = rates?.updatedAt
    ? formatIstDateTime(rates.updatedAt.toDate())
    : ratesLoading
      ? 'Loading latest desk update...'
      : 'Awaiting initial rate publication by owner';

  return (
    <div className="bg-[#FAF7F2]">
      {/* Page Header */}
      <section className="bg-[#120E10] text-[#FAF7F2] border-b border-[#D4AF37]/20 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E2C16B] mb-3">
                Nellore Bullion Desk · Wholesale Reference
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2] [text-wrap:balance]">
                24K Gold, 22K Gold &amp; Silver Rates
              </h1>
            </div>

            <div className="bg-[#1B1517] border border-[#D4AF37]/30 px-5 py-3.5 text-xs space-y-1 shrink-0">
              <p className="text-[#A89B8F] uppercase tracking-wider text-[11px]">Last Updated</p>
              <p className="font-mono-tabular text-sm text-[#E2C16B]">{lastUpdatedText}</p>
            </div>
          </div>

          {ratesError && (
            <div className="mt-6 p-4 bg-[#4A0D1C] border border-[#D4AF37]/40 text-sm text-[#FAF7F2] flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-[#E2C16B] shrink-0" />
              <span>{ratesError}</span>
            </div>
          )}
        </div>
      </section>

      {/* Public Live Rate Cards */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 24K Gold */}
            <div className="bg-white border border-[#181315]/10 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.10)] p-8 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A67C2E] mb-2">
                  24 Karat · 999 Purity
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#181315]">
                  24K Fine Gold
                </h2>
              </div>

              <div>
                <p className="font-mono-tabular text-4xl font-medium text-[#181315]">
                  {rates ? formatInr(rates.gold24kPer10g) : '—'}
                </p>
                <p className="text-xs text-[#5E534E] mt-2 font-mono-tabular">
                  Per 10 Grams &middot;{' '}
                  {rates ? `${formatInr(Math.round(rates.gold24kPer10g / 10))} / 1g` : 'Awaiting rate'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#181315]/10 text-xs text-[#857972]">
                Pure bullion &amp; minted bar wholesale benchmark
              </div>
            </div>

            {/* 22K Gold — Signature Royal Burgundy Featured Card */}
            <div className="bg-[#4A0D1C] text-[#FAF7F2] border border-[#D4AF37]/35 shadow-[0_20px_48px_-16px_rgba(74,13,28,0.45)] p-8 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E2C16B] mb-2">
                  22 Karat · 916 BIS Hallmarked
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#FAF7F2]">
                  22K Jewellery Gold
                </h2>
              </div>

              <div>
                <p className="font-mono-tabular text-4xl font-medium text-[#E2C16B]">
                  {rates ? formatInr(rates.gold22kPer10g) : '—'}
                </p>
                <p className="text-xs text-[#E5D7C6] mt-2 font-mono-tabular">
                  Per 10 Grams &middot;{' '}
                  {rates ? `${formatInr(Math.round(rates.gold22kPer10g / 10))} / 1g` : 'Awaiting rate'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#FAF7F2]/15 text-xs text-[#E5D7C6]">
                Temple harams, Kasu Mala, bangles &amp; bridal ornaments
              </div>
            </div>

            {/* 999 Silver */}
            <div className="bg-white border border-[#181315]/10 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.10)] p-8 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A67C2E] mb-2">
                  999 Fine Silver
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#181315]">
                  Pure Silver
                </h2>
              </div>

              <div>
                <p className="font-mono-tabular text-4xl font-medium text-[#181315]">
                  {rates ? formatInr(rates.silverPerKg) : '—'}
                </p>
                <p className="text-xs text-[#5E534E] mt-2 font-mono-tabular">
                  Per 1 Kilogram &middot;{' '}
                  {rates ? `${formatInr(rates.silverPer10g)} / 10g` : 'Awaiting rate'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#181315]/10 text-xs text-[#857972]">
                Pooja kalash, deepams, payals &amp; wholesale silver bars
              </div>
            </div>
          </div>

          {/* GST & Market Note Disclosure Bar */}
          <div className="bg-[#F2ECE2] border border-[#181315]/10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#4A0D1C]">
                {rates?.gstNote || 'GST will be added later.'}
              </p>
              <p className="text-xs text-[#5E534E]">
                {rates?.marketNote
                  ? `Desk Remark: ${rates.marketNote}`
                  : 'Applicable GST and wholesale factory making charges are itemized at invoice confirmation.'}
              </p>
            </div>
            <p className="text-xs text-[#5E534E] font-mono-tabular shrink-0">
              Desk: {rates?.updatedByLabel || 'SATYAM SHIVAM JEWELLERY'}
            </p>
          </div>

          {/* Wholesale Metal Value Estimator */}
          <div className="bg-white border border-[#181315]/10 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.08)] p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Calculator className="w-5 h-5 text-[#4A0D1C]" />
              <h3 className="font-display text-2xl font-semibold text-[#181315]">
                Wholesale Metal Value Estimator
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-[#5E534E] mb-2">
                  Select Metal Purity
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF7F2] border border-[#181315]/12">
                  {(
                    [
                      ['24k', '24K Gold'],
                      ['22k', '22K Gold'],
                      ['silver', '999 Silver'],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCalcMetal(val)}
                      className={`py-2 px-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                        calcMetal === val
                          ? 'bg-[#4A0D1C] text-[#FAF7F2]'
                          : 'text-[#5E534E] hover:text-[#181315]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="estimator-grams" className="block text-xs font-medium text-[#5E534E] mb-2">
                  Net Weight (Grams)
                </label>
                <input
                  id="estimator-grams"
                  type="number"
                  min="1"
                  step="0.5"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                />
              </div>

              <div className="md:col-span-4 bg-[#120E10] text-[#FAF7F2] px-5 py-3.5">
                <p className="text-[11px] uppercase tracking-wider text-[#A89B8F]">
                  Estimated Base Metal Value
                </p>
                <p className="font-mono-tabular text-2xl font-medium text-[#E2C16B]">
                  {rates ? formatInr(estimatedValue) : '—'}
                </p>
                <p className="text-[11px] text-[#A89B8F] mt-0.5">
                  Excludes making charges · GST will be added later
                </p>
              </div>
            </div>
          </div>

          {/* Owner-Only Rate Management System */}
          <div className="bg-white border border-[#181315]/12 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.08)] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#181315]/10">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#4A0D1C] mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#181315]">
                    Owner-Only Rate Management
                  </h2>
                  <p className="text-xs text-[#5E534E] mt-1">
                    Restricted to the verified SATYAM SHIVAM JEWELLERY owner account to manually update daily rates and update time.
                  </p>
                </div>
              </div>

              {authReady && !user && (
                <button
                  type="button"
                  onClick={handleSignInClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#631326] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Owner Sign In</span>
                </button>
              )}

              {authReady && user && (
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-[#5E534E] truncate max-w-[200px]">
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#181315]/20 text-xs font-semibold text-[#181315] hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {authFeedback && (
              <div className="p-4 bg-[#4A0D1C]/10 border border-[#4A0D1C]/30 text-xs text-[#4A0D1C]">
                {authFeedback}
              </div>
            )}

            {!authReady && (
              <p className="text-xs text-[#5E534E]">Checking owner authentication status...</p>
            )}

            {authReady && user && !isOwner && (
              <div className="p-4 bg-[#4A0D1C]/8 border border-[#4A0D1C]/30 text-sm text-[#181315] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#4A0D1C] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#4A0D1C]">Unauthorized Account</p>
                  <p className="text-xs text-[#5E534E] mt-1">
                    Signed in as {user.email}. Only the authorized owner account can modify live wholesale rates. Please sign out and sign in with the owner Google account.
                  </p>
                </div>
              </div>
            )}

            {authReady && isOwner && (
              <div className="space-y-8">
                <form onSubmit={handleSubmitRates} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <label htmlFor="rate-24k" className="block text-xs font-medium text-[#5E534E] mb-2">
                        24K Gold (INR / 10g)
                      </label>
                      <input
                        id="rate-24k"
                        type="number"
                        required
                        min="1"
                        max="10000000"
                        value={gold24kInput}
                        onChange={(e) => setGold24kInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="rate-22k" className="block text-xs font-medium text-[#5E534E] mb-2">
                        22K Gold (INR / 10g)
                      </label>
                      <input
                        id="rate-22k"
                        type="number"
                        required
                        min="1"
                        max="10000000"
                        value={gold22kInput}
                        onChange={(e) => setGold22kInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="rate-silver-kg" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Silver (INR / 1 Kg)
                      </label>
                      <input
                        id="rate-silver-kg"
                        type="number"
                        required
                        min="1"
                        max="10000000"
                        value={silverKgInput}
                        onChange={(e) => handleSilverKgChange(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="rate-silver-10g" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Silver (INR / 10g)
                      </label>
                      <input
                        id="rate-silver-10g"
                        type="number"
                        required
                        min="1"
                        max="10000000"
                        value={silver10gInput}
                        onChange={(e) => setSilver10gInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label htmlFor="gst-note" className="block text-xs font-medium text-[#5E534E] mb-2">
                        GST Billing Notice
                      </label>
                      <input
                        id="gst-note"
                        type="text"
                        required
                        maxLength={140}
                        value={gstNoteInput}
                        onChange={(e) => setGstNoteInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="updated-by-label" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Desk Display Label
                      </label>
                      <input
                        id="updated-by-label"
                        type="text"
                        required
                        maxLength={60}
                        value={updatedByLabelInput}
                        onChange={(e) => setUpdatedByLabelInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="market-note" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Optional Market Remark
                      </label>
                      <input
                        id="market-note"
                        type="text"
                        maxLength={200}
                        placeholder="e.g., Morning Nellore wholesale opening"
                        value={marketNoteInput}
                        onChange={(e) => setMarketNoteInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>
                  </div>

                  {formFeedback && (
                    <div
                      className={`p-4 border text-xs flex items-center gap-2.5 ${
                        formFeedback.type === 'success'
                          ? 'bg-[#F2ECE2] border-[#A67C2E]/40 text-[#181315]'
                          : 'bg-[#4A0D1C]/10 border-[#4A0D1C]/35 text-[#4A0D1C]'
                      }`}
                    >
                      {formFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#A67C2E] shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#4A0D1C] shrink-0" />
                      )}
                      <span>{formFeedback.message}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#857972]">
                      Publishing updates the live server timestamp automatically.
                    </p>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-7 py-3 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {saving ? 'Publishing Rates...' : 'Publish Live Rates'}
                    </button>
                  </div>
                </form>

                {/* Owner Audit Trail */}
                {history.length > 0 && (
                  <div className="pt-6 border-t border-[#181315]/10">
                    <h3 className="font-display text-lg font-semibold text-[#181315] mb-4">
                      Recent Manual Rate Updates
                    </h3>
                    <div className="overflow-x-auto border border-[#181315]/10">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F2ECE2] text-[#181315] border-b border-[#181315]/10">
                          <tr>
                            <th className="py-3 px-4 font-semibold">Update Time (IST)</th>
                            <th className="py-3 px-4 font-semibold">24K (10g)</th>
                            <th className="py-3 px-4 font-semibold">22K (10g)</th>
                            <th className="py-3 px-4 font-semibold">Silver (1 Kg)</th>
                            <th className="py-3 px-4 font-semibold">Remark</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#181315]/8">
                          {history.slice(0, 8).map((entry) => (
                            <tr key={entry.id} className="hover:bg-[#FAF7F2]">
                              <td className="py-3 px-4 font-mono-tabular text-[#5E534E] whitespace-nowrap">
                                {entry.updatedAt
                                  ? formatIstDateTime(entry.updatedAt.toDate())
                                  : 'Pending...'}
                              </td>
                              <td className="py-3 px-4 font-mono-tabular font-medium text-[#181315]">
                                {formatInr(entry.gold24kPer10g)}
                              </td>
                              <td className="py-3 px-4 font-mono-tabular font-medium text-[#4A0D1C]">
                                {formatInr(entry.gold22kPer10g)}
                              </td>
                              <td className="py-3 px-4 font-mono-tabular text-[#181315]">
                                {formatInr(entry.silverPerKg)}
                              </td>
                              <td className="py-3 px-4 text-[#5E534E]">
                                {entry.marketNote || '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
