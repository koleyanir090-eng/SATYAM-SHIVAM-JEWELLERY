import { FormEvent, useEffect, useState } from 'react';
import { Phone, MessageCircle, Instagram, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  preselectedItem: string;
}

export function ContactPage({ preselectedItem }: ContactPageProps) {
  const [businessName, setBusinessName] = useState('');
  const [cityState, setCityState] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('22K BIS 916 Temple & Bridal Jewellery');
  const [message, setMessage] = useState('');
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedItem) {
      setMessage(`Wholesale inquiry regarding: ${preselectedItem}`);
    }
  }, [preselectedItem]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      'Namaste SATYAM SHIVAM JEWELLERY,',
      `Showroom / Firm: ${businessName.trim()}`,
      `City & State: ${cityState.trim()}`,
      `Phone: ${phone.trim()}`,
      `Interest: ${category}`,
      message.trim() ? `Details: ${message.trim()}` : '',
    ].filter(Boolean);

    const url = `https://wa.me/916304375143?text=${encodeURIComponent(lines.join('\n'))}`;
    setSubmittedWhatsappUrl(url);
  };

  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section className="bg-[#120E10] text-[#FAF7F2] border-b border-[#D4AF37]/20 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E2C16B] mb-3">
            All-India Wholesale Desk
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2] [text-wrap:balance] mb-4">
            Contact SATYAM SHIVAM JEWELLERY
          </h1>
          <p className="text-base text-[#CBBFB4] max-w-2xl leading-relaxed">
            Connect directly with our Chinna Bazar manufacturing and wholesale office for daily bullion bookings, custom 22K bridal manufacturing, and bulk silver supply across India.
          </p>
        </div>
      </section>

      {/* Contact Channels + Wholesale Inquiry Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#181315]/10 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.10)] p-8 space-y-6">
                <h2 className="font-display text-2xl font-semibold text-[#181315]">
                  Direct Wholesale Channels
                </h2>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[#4A0D1C] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#857972] mb-0.5">Office &amp; WhatsApp</p>
                      <a
                        href="tel:+916304375143"
                        className="font-mono-tabular text-base font-medium text-[#4A0D1C] hover:underline"
                      >
                        +91 6304375143
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Instagram className="w-4 h-4 text-[#4A0D1C] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#857972] mb-0.5">Instagram</p>
                      <a
                        href="https://www.instagram.com/satyamshivamjewellery143/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#181315] hover:text-[#4A0D1C] hover:underline font-medium"
                      >
                        @satyamshivamjewellery143
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-[#4A0D1C] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#857972] mb-0.5">Factory &amp; Showroom</p>
                      <p className="text-[#5E534E] leading-relaxed">
                        Chinna Bazar, Nellore, Andhra Pradesh 524001, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#181315]/10 space-y-3">
                  <a
                    href="https://wa.me/916304375143?text=Namaste%20SATYAM%20SHIVAM%20JEWELLERY%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20jewellery%20supply."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.06em] uppercase hover:bg-[#631326] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message on WhatsApp (+91 6304375143)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/satyamshivamjewellery143/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 border border-[#181315]/20 text-[#181315] text-xs font-semibold tracking-[0.06em] uppercase hover:border-[#4A0D1C] hover:text-[#4A0D1C] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#4A0D1C]" />
                    <span>Follow @satyamshivamjewellery143</span>
                  </a>
                  <p className="text-xs text-[#857972]">
                    Billing Note: GST will be added later at final wholesale invoice.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#181315]/10 shadow-[0_12px_32px_-14px_rgba(24,19,21,0.10)] p-7 sm:p-9">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#181315] mb-2">
                  Wholesale Trade Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#5E534E] mb-7">
                  Prepare your wholesale requirement below and dispatch it directly to our Nellore WhatsApp desk.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firm-name" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Showroom / Business Name
                      </label>
                      <input
                        id="firm-name"
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g., Sri Lakshmi Jewellers"
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="city-state" className="block text-xs font-medium text-[#5E534E] mb-2">
                        City &amp; State
                      </label>
                      <input
                        id="city-state"
                        type="text"
                        required
                        value={cityState}
                        onChange={(e) => setCityState(e.target.value)}
                        placeholder="e.g., Vijayawada, Andhra Pradesh"
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Mobile / WhatsApp Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98XXXXXXXX"
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] font-mono-tabular text-sm focus:outline-none focus:border-[#4A0D1C]"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-category" className="block text-xs font-medium text-[#5E534E] mb-2">
                        Primary Requirement
                      </label>
                      <select
                        id="inquiry-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                      >
                        <option value="22K BIS 916 Temple & Bridal Jewellery">
                          22K BIS 916 Temple &amp; Bridal Jewellery
                        </option>
                        <option value="22K Nakshi Bangles & Kadas">
                          22K Nakshi Bangles &amp; Kadas
                        </option>
                        <option value="24K Bullion & Custom Manufacturing">
                          24K Bullion &amp; Custom Manufacturing
                        </option>
                        <option value="999 Fine Silver Pooja & Anklets">
                          999 Fine Silver Pooja &amp; Anklets
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-medium text-[#5E534E] mb-2">
                      Weight Requirement &amp; Notes
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify approximate gram/kg quantities, purity, or showroom visit dates..."
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#181315]/20 text-[#181315] text-sm focus:outline-none focus:border-[#4A0D1C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#631326] transition-colors cursor-pointer"
                  >
                    Prepare Wholesale Inquiry
                  </button>
                </form>

                {submittedWhatsappUrl && (
                  <div className="mt-6 p-5 bg-[#F2ECE2] border border-[#A67C2E]/40 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#4A0D1C]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Wholesale Inquiry Ready for Dispatch</span>
                    </div>
                    <p className="text-xs text-[#5E534E] leading-relaxed">
                      Your trade inquiry for <strong className="text-[#181315]">{businessName}</strong> is formatted. Click below to send it directly to our wholesale desk on WhatsApp (+91 6304375143).
                    </p>
                    <a
                      href={submittedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.06em] uppercase hover:bg-[#631326] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp Now</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
