import { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, Phone, ExternalLink, Clock, Instagram } from 'lucide-react';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';
const SHOWROOM_QUERY = 'Chinna Bazar, Nellore, Andhra Pradesh 524001, India';
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SHOWROOM_QUERY
)}`;

interface ResolvedShowroom {
  location: { lat: number; lng: number };
  formattedAddress: string;
  displayName: string;
}

function ShowroomMapCanvas() {
  const loadingStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [resolved, setResolved] = useState<ResolvedShowroom | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.AUTH_FAILURE ||
      loadingStatus === APILoadingStatus.FAILED
    ) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  }, [loadingStatus]);

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    async function locateShowroom() {
      try {
        const { places } = await placesLib!.Place.searchByText({
          textQuery: SHOWROOM_QUERY,
          fields: ['location', 'formattedAddress', 'displayName'],
        });

        if (cancelled) return;

        const firstPlace = places?.[0];
        if (firstPlace?.location) {
          setResolved({
            location: {
              lat: firstPlace.location.lat(),
              lng: firstPlace.location.lng(),
            },
            formattedAddress: firstPlace.formattedAddress || SHOWROOM_QUERY,
            displayName: 'SATYAM SHIVAM JEWELLERY',
          });
          setLookupError(null);
        } else {
          setLookupError('Showroom area could not be resolved on the map right now.');
        }
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429') ||
          msg.toLowerCase().includes('quota')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setLookupError('Unable to load live Google Maps location details right now.');
      }
    }

    locateShowroom();
    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  if (lookupError) {
    return (
      <div className="h-[440px] lg:h-[520px] bg-white border border-[#181315]/10 shadow-sm flex flex-col items-center justify-center p-8 text-center">
        <MapPin className="w-8 h-8 text-[#4A0D1C] mb-3" />
        <p className="font-display text-2xl text-[#181315] mb-2">
          SATYAM SHIVAM JEWELLERY
        </p>
        <p className="text-sm text-[#5E534E] max-w-md mb-5">
          {SHOWROOM_QUERY}
        </p>
        <p className="text-xs text-[#857972] mb-6">{lookupError}</p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#631326] transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="h-[440px] lg:h-[520px] bg-white border border-[#181315]/10 shadow-sm flex flex-col items-center justify-center p-8 text-center">
        <p className="font-display text-xl text-[#4A0D1C] mb-2">
          Locating Chinna Bazar, Nellore...
        </p>
        <p className="text-xs text-[#5E534E]">
          Loading Google Maps interactive showroom view
        </p>
      </div>
    );
  }

  return (
    <div className="h-[440px] lg:h-[520px] w-full border border-[#181315]/12 shadow-[0_14px_38px_-14px_rgba(24,19,21,0.14)] overflow-hidden bg-white">
      <GoogleMap
        defaultCenter={resolved.location}
        defaultZoom={16}
        mapId="DEMO_MAP_ID"
        gestureHandling="greedy"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={resolved.location}
          title="SATYAM SHIVAM JEWELLERY — Chinna Bazar, Nellore"
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin background="#4A0D1C" borderColor="#D4AF37" glyphColor="#F5E3B3" scale={1.2} />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={280}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="text-[#140F12] p-1 space-y-1.5">
              <p className="font-semibold text-sm text-[#4A0D1C]">
                {resolved.displayName}
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {resolved.formattedAddress}
              </p>
              <p className="text-xs font-medium text-neutral-800">
                Office &amp; WhatsApp: +91 6304375143
              </p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-[#4A0D1C] underline pt-1"
              >
                Get Directions
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function LocationPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section className="bg-[#120E10] text-[#FAF7F2] border-b border-[#D4AF37]/20 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E2C16B] mb-3">
            Visit Our Showroom &amp; Factory
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2] [text-wrap:balance] mb-4">
            Chinna Bazar, Nellore
          </h1>
          <p className="text-base text-[#CBBFB4] max-w-2xl leading-relaxed">
            Located in the heart of Nellore’s traditional bullion and jewellery market. Wholesale buyers and retail partners are welcome for scheduled showroom visits and bulk sample reviews.
          </p>
        </div>
      </section>

      {/* Map + Details Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8">
              {MAPS_API_KEY ? (
                <APIProvider apiKey={MAPS_API_KEY} language="en" region="IN">
                  <ShowroomMapCanvas />
                </APIProvider>
              ) : (
                <div className="h-[440px] lg:h-[520px] bg-white border border-[#181315]/10 shadow-sm flex flex-col items-center justify-center p-8 text-center">
                  <MapPin className="w-8 h-8 text-[#4A0D1C] mb-3" />
                  <p className="font-display text-2xl text-[#181315] mb-2">
                    SATYAM SHIVAM JEWELLERY
                  </p>
                  <p className="text-sm text-[#5E534E] mb-6">{SHOWROOM_QUERY}</p>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#631326] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 bg-white border border-[#181315]/10 shadow-[0_14px_38px_-14px_rgba(24,19,21,0.10)] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#181315] mb-4">
                    Showroom Address
                  </h2>
                  <div className="flex items-start gap-3 text-sm text-[#5E534E]">
                    <MapPin className="w-4 h-4 text-[#4A0D1C] mt-1 shrink-0" />
                    <p className="leading-relaxed">
                      <span className="font-semibold text-[#181315]">SATYAM SHIVAM JEWELLERY</span>
                      <br />
                      Chinna Bazar, Nellore,
                      <br />
                      Andhra Pradesh 524001, India
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#181315]/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A67C2E] mb-2">
                    Wholesale Desk
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-[#181315]">
                    <Phone className="w-4 h-4 text-[#4A0D1C] shrink-0" />
                    <a href="tel:+916304375143" className="font-mono-tabular font-medium hover:text-[#4A0D1C]">
                      +91 6304375143
                    </a>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#181315]/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A67C2E] mb-2">
                    Business Hours
                  </h3>
                  <div className="flex items-start gap-3 text-sm text-[#5E534E]">
                    <Clock className="w-4 h-4 text-[#4A0D1C] mt-0.5 shrink-0" />
                    <p>Monday – Saturday: 10:30 AM to 8:30 PM IST</p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#181315]/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A67C2E] mb-2">
                    Instagram
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-[#181315]">
                    <Instagram className="w-4 h-4 text-[#4A0D1C] shrink-0" />
                    <a
                      href="https://www.instagram.com/satyamshivamjewellery143/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#4A0D1C] hover:underline font-medium"
                    >
                      @satyamshivamjewellery143
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-[#4A0D1C] text-[#FAF7F2] text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#631326] transition-colors"
              >
                <span>Open Directions in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
